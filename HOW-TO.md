# How to Build Your Own Journey App

## Table of Contents

**[Introduction](#introduction)**<br>
**[Application Overview](#application-overview)**<br>
- **[UI5 Application Details](#ui5-application-details)**<br>
- **[Workflow Details](#workflow-details)**<br>
- **[Lifecycle](#lifecycle)**<br>

**[Rolling Your Own](#rolling-your-own)**<br>
- **[Introduction](#ryo-introduction)**<br>
- **[UI Changes](#ryo-ui-changes)**<br>
- **[Controller Changes](#ryo-controller-changes)**<br>
- **[Workflow Changes](#ryo-workflow-changes)**<br>

**[Building in SAP Business Application Studio](#building-in-bas)**<br>

<a name="introduction">

## Introduction
</a>

This guide will help you build your own Journey App, using the template code as a starting point.

<a name="application-overview">

## Application Overview
</a>

The application consists of two basic building blocks:

1. SAP UI5 Application wrapped in a UI Integration Card
2. SAP Cloud Platform workflow

These two items are then packaged using Content Packager into a single deployable item, which can be uploaded into SAP Work Zone.

The UI5 Application controls and interacts with the workflow through workflow APIs.  The UI5 Application provides the user-facing UX,and the workflow handles other interactions (for example, choreographing approvals, or calls to external services).

For more details about SAP UI5 Applications in general, there are various tutorials and guides.  For example

https://developers.sap.com/mission.sapui5-cf-first.html

For general details on UI5:

https://help.sap.com/viewer/product/SAPUI5/External/en-US

Similarly, there are guides for building SAP Cloud Platform Workflows, such as

https://help.sap.com/viewer/product/WORKFLOW_SERVICE/Cloud/en-US

and this one which describes the APIs that our application uses:

https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/df943e71122448caaf3c49f5ffd80627.html

<a name="ui5-application-details">

### UI5 Application Details
</a>

#### Basic Architecture 

The UI5 Application is a straightforward UI5 Component-based application.  It consists of a `Component.js` file, which is used to initialise and configure the application, an XML View (the root of this is defined in `Main.view.xml`), a controller (`Main.controller.js`) and a JSON model.

In addtion, there are some suport files to assist in the coding and provide helper methods.

The application follows the recommended UI5 MVC approach to creating a user-facing component.  In our case, the model is a JSON object that is shared with the workflow.  The controller supports all the necssary UI events, and the XML View implements a straightforward Wizard.

The MVC model works on the basis that the UI binds to the underlying model - and so controls will initialise themselves based on the property values found in the context object.  If the model changes, then this will trigger changes to the UI to reflect the newly updated property values.  The user may trigger events (by for example clicking on a button or filling in the value of a field).  These events are captured by the controller, and based on the event, this may trigger an update to the workflow.

The UI is based around a UI5 Wizard control.  For more details of this control, see the UI5 documentation:

https://openui5.hana.ondemand.com/api/sap.m.Wizard

and

https://openui5.hana.ondemand.com/entity/sap.m.Wizard

#### UI Integration Card

The application is delivered to SAP Work Zone as a UI Integration Card.  This is defined in the file `manifest.json` via the property `sap.app/type`, which should be the string `card`.  In this case, we are deliveringn the appliucation as a `Component` card, so this card type is set via `sap.card/type`.

The application has two sets of property that determine the title and description that will be available in SAP Work Zone.  The first set are under `sap.app/title` and `sap.app/description`: these determine the title and description visible to the administrator of SAP Work Zone.  They can be internationalised using a property file under `i18n/i18n_<language>.properties`.  For example, to set English title and decsription, ensure the file `i18n_en.properties` exists with the necessary English strings.  See this link for some more details on internationalising your application:

https://sapui5.hana.ondemand.com/1.36.6/docs/guide/df86bfbeab0645e5b764ffa488ed57dc.html

The second set of properties that are relevant to naming and describing the application are those in the UI Integration Card section.  These are displayed to the end user when the Card is rendered in a workplace.  These are defined under `sap.card/header/title` and `sap.card/header/subTitle`, and an optional icon defined in `sap.app/header/icon/src`.

Also defined under `sap.card` are configuration values relevant to the runtime execution of the application.  These are defined via `sap.card/configuration`, and consit of two basica types: 

1. destinations used by the application
2. parameters used to control the behaviour of the application

To define destinations, use the syntax:

```
{
    ...
    "sap.card": {
        "configuration": {
            "destinations": {
                "<logical name of destination>": {
                    "name": "<default value to use>"
                },
                ...
            }
        }
    }
    ...
}
```

When the company administrator configures the UI Integration Card, the destinations will be mapped to *actual* Cloud Foundry destinations (defined at the sub-account level).

Within the application, you can then resolve the path that the destination is resolved to in code:

```
        ...
        this._ownerComponent = this.getOwnerComponent();
        this._card = this._ownerComponent.card;

        // resolve destinations
        Promise.all([
            this._card.resolveDestination("mySFDestination"),
            this._card.resolveDestination("myJAMDestination"),
            this._card.resolveDestination("myCMISDestination")
        ]).then((results) => {
            // we have resolved destinations
            this._sfDest = results[0];
            this._jamDest = results[1];
            this._cmisDest = results[2];
            ...

```

Then you can use the resolved URLs to access the necessary destinations.

Parameters can be passed to the application via the `parameters` section:

```
{
    ...
    "sap.card": {
        "configuration": {
            "parameters": {
                "userId": {
                    "value": "{context>sap.workzone/currentUser/id/value}",
                    "type": "string",
                    "label": "User ID"
                },
                "userName": {
                    "value": "{context>sap.workzone/currentUser/name/value}",
                    "type": "string",
                    "label": "User Name"
                },

            }
        }
    }
    ...
}
```

In this example, we have two parameters (`userId` and `userName`) which are set to values extracted from a context when the card is rendered in the workplace.  The synatx to extract `context` values is

```
    {context>sap.workzone/<context object>/<attribute>/value}
```

Three context objects are available:

1. `currentUser` - with attributes `id`, `name`, `email`
2. `currentWorkspace` - with attributes `id`, and `name`
3. `currentCompany` - with attributes `id` and `name`

If you want tro provide additonal parameters, simply add them to the set of parameters using this syntax:

```
{
    ...
    "sap.card": {
        "configuration": {
            "parameters": {
                "<name>": {
                    "value": "<default value>",
                    "type": "<type>",
                    "label": "<label for configuration>"
                },
                ...
            }
        }
    }
    ...
}
```

The `label` is used in the configuration screen to identify the parameter.  The `<default value>` is used unless the configuration overrides this.  The `type` can be `string` or `enum`.

#### UI Bindings

The `context` object is bound to UI controls using the UI5 binding syntax.  In general, property paths are defined with a syntax like `{<path to property>}` or `{path: '<path to property>'}`. Paths are defined using a simple `<parent>/<child>/<grandchild>` syntax For example, this shows how the property `date/start` is bound to a `DatePicker` control:

```
<DatePicker id="lrStart"
        change=".checkLR"
        value="{path:'date/start'}"
        valueFormat="yyyy-MM-dd'T'hh:mm:ss.SSS'Z'"
        editable="{= ${status} === 'open' || ${status} === 'error'}" />
```

This also shows how to dynamically determine the value of expressios that are then bound to a control property.  Here the control's `editable` property is set based on the bound property `status`.

Note that typically containers are bound to a context property and elements in the container are then bound to *relative* properties.  So you might see this:

```
	<VBox id="Step1_substep1_consultation"
          class="substepMarginLeft substepActive"
          visible="{= ${visible}}"
          binding="{/context/journeyApp/consultation}">
```

Here we define a binding at the `VBox` container level, and sub-controls (for example, the `DatePicker` above) refer to properties *relative* to the root `/context/journeyApp/consultation`

For more details on bindings and expression binding, go to:

https://sapui5.hana.ondemand.com/#/topic/68b9644a253741e8a4b9e4279a35c247

#### Context Object

The application shares with the workflow the `context` object.  Broadly, this has the JSON structure

```
{
    context: {
        businessKey: <business key>,
        <application identifier>: {
            //---
            // State
            //---
            state: "<state>",
            readyForMessage: <null or mesage identifier>,
            progress: "<some progress string>",
            currentStep: <step number>,
            stepValidated: <step validated>,
            //---
            // Documents
            //---
            documents: [<array of document handles>],
            documentProvider: "CMIS" or "JAM",
            documentDestination: "<resolved document API end point>",
            //---
            // User Context
            //---
            workspaceName: "<workspace name>",
            user: {
                id: "<user id>",
                email: "<user email>",
                name: "<user name>"
            },
            //---
            // Wizard step 1
            //---
            <sub step for wizard step 1>: {
                visible: true or false,
                status: "open" or "inprocess" or "error" or "complete",
                ... specific property values for this sub-step
            },
            ...
        }
```

#### Wizard Structure

A wizard is built from a variety of wizard steps, and in the case of our applciation, each wizard step is composed of a number of sub-steps.

The main wizard is defined in `webapp/view/Main.view.xml`.

At any moment, the wizard will have a current step that is showing, and also whether this step is validated or not.  If the step is validated, the user can then click to go to the next step.  If it is not validated, then addtional input is needed to allow the user to move forward.  This is managed through two properties in the context object: `currentStep` and `stepValidated`.  Initially both are set to 0, so that we are on step 0 (the first step fron the user's perspective) and it is not validated.  When the first step is validated, the `stepValidated` property is set to 1, indicating that the user is free to move to step 1, although the current step will remain as 0 until the user clicks on the wizard 'next' button.

Each sub-step is held in a separate file defined through the `Fragment` components.  For example, in the template, the first wizard step is:

```
		<WizardStep id="Step1_Applyforleave"
                    title="{i18n>STEP1_APPLYFORLEAVE_TITLE}"
                    validated="{= ${stepValidated} >= 1}"
                    complete=".uiEventWizardStep1Complete">
			<Title text="Apply for leave" titleStyle="H3" class="sapUiSmallMarginBottom shiftHeader plheader" />

			<core:Fragment type="XML" fragmentName="sap.wz.journey.template.card.view.fragments.step1_1_consultation" />
			<core:Fragment type="XML" fragmentName="sap.wz.journey.template.card.view.fragments.step1_2_uploadDocuments" />
			<core:Fragment type="XML" fragmentName="sap.wz.journey.template.card.view.fragments.step1_3_createLeaveRequest" />
			<VBox class="sapUiSmallMarginBottom"></VBox>
		</WizardStep>
```

This contains a number of sub-steps, each held in a separate fragment, each fragment in its own file.  The fragments will all be located under `webapp/view/fragments`.  Each fragment defines the UI for thatfragments content.  The structure of each fragment is broadly:

```
VBox
  Panel
    Icons to show Sub Step status (open, in process, error, complete)
    VBoxes for UI layout
    Button for Sub Step completion
    VBox to hold Sub Step status messages
```

Each sub-step is mapped to the `context` object and has its own section.  For example, the sub-step `consultation` (defined in `step1_1_consultation.fragment.xml`) maps to this section of the consultation object:

```
            consultation: {
                visible: false,
                status: "open",
                processor: null,
                termsAccepted: false,
                dueDate: null
            },
```

You can see the UI bindings to this JSON object in the XML:

```
<core:FragmentDefinition xmlns="sap.m" 
	xmlns:form="sap.ui.layout.form" 
	xmlns:l="sap.ui.layout" 
	xmlns:core="sap.ui.core" 
	xmlns:u="sap.ui.unified" 
	xmlns:mvc="sap.ui.core.mvc">
	<VBox id="Step1_substep1_consultation"
          class="substepMarginLeft substepActive"
          visible="{= ${visible}}"
          binding="{/context/journeyApp/consultation}">
		<Panel expandable="true" expanded="{= ${status} !== 'completed'}" width="auto" backgroundDesign="Transparent">
			<headerToolbar>
				<OverflowToolbar height="2rem" style="Clear">
					<Title text="{i18n>STEPS_APPLYFORLEAVE_STEPS_CONSULTATION_TITLE}" />
					<core:Icon src="sap-icon://complete" class="size1" visible="{= ${status} === 'completed'}"/>
					<core:Icon src="sap-icon://accept" class="size1" visible="{= ${status} === 'inprocess'}"/>
					<core:Icon src="sap-icon://user-edit" class="size1" visible="{= ${status} === 'open'}"/>
					<core:Icon src="sap-icon://error" class="size1" visible="{= ${status} === 'error'}"/>
				</OverflowToolbar>
			</headerToolbar>

			<VBox class="substep">
				<Label text="Your baby's due date"
                       required="{= ${status} === 'open' || ${status} === 'error'}"/>
				<DatePicker id="sections_dueDate_value"
                            maxDate="{path:'dueDate', formatter:'.formatMaxDueDate'}"
                            minDate="{path:'dueDate', formatter:'.formatMinDueDate'}"
                            value="{path:'dueDate'}"
                            valueFormat="yyyy-MM-dd'T'hh:mm:ss.SSS'Z'"
                            change=".checkAndSetDueDate"
                            width="300px"
                            editable="{= ${status} === 'open' || ${status} === 'error'}"/>
			</VBox>
			<VBox class="substep">
				<HBox>
					<Label class="sapUiSmallMarginTop"
                           text="Terms &amp; Conditions"
                           required="{= ${status} === 'open' || ${status} === 'error'}" />
					<Link href="test" text="Read now..." class="sapUiSmallMarginTop baseline"/>
				</HBox>
				<CheckBox selected="{termsAccepted}"
                          text="I agree to the Terms and Conditions"
                          editable="{= ${status} === 'open' || ${status} === 'error'}"/>
            </VBox>

            <Button visible="{= ${status} === 'open' || ${status} === 'error'}"
                    type="{= (${dueDate} !== null &amp;&amp; ${termsAccepted}) ? 'Emphasized' : 'Default'}"
                    enabled="{= ${dueDate} !== null &amp;&amp; ${termsAccepted} !== null}"
                    class="sapUiSmallMarginTop substep"
                    text="Sign Up Now"
                    press=".uiEventSignUpNow"/>

            <VBox class="substep"
                  visible="{= ${status} !== 'open'}">
				<Text visible="{= ${status} === 'inprocess'}" class="sapUiSmallMarginTop successtext" text="You are in the process of being signed up.  Please wait." />
				<Text visible="{= ${status} === 'error'}" class="sapUiSmallMarginTop successtext" text="It was not possible to sign you up: {errorMsg}" />
				<Text visible="{= ${status} === 'completed'}" class="sapUiSmallMarginTop successtext" text="You are signed up. Your HR department will contact you soon." />
				<HBox visible="{= ${status} === 'completed'}" class="sapUiSmallMarginTop">
					<Label text="Your HR Contact" required="false" width="120px"/>
					<Link href="mailto:{processor/email}" text="{processor/name}" />
				</HBox>
				<HBox visible="{= ${status} === 'completed'}" >
					<Label text="HR Ticket Number" required="false" width="120px"/>
					<Link href="{processor/hrticketdeeplink}" text="{processor/hrticketnumber}" />
				</HBox>
			</VBox>
		</Panel>

	</VBox>

</core:FragmentDefinition>
```

#### Workflow Interaction

As mentioned earlier, the application will query the workflow on start-up to find a running instance.  The example assumes only a single instance for the user can exist.  If multiple running instances are supported, you will need to adjust the code to select the one that is relevant to this application usage.

Querying the workflow is done through `_queryWorkflow()` API call.

If no workflow is running, the application can create a new workflow the using `_createWorkflow()` API.

The template used here assumes that (once a matched instance of a workflow is found) that there are two basic states the application can be in:

1. The workflow is waiting for a message from the application so it can progress to the next step
2. The workflow is performing some step (potentially long running) and the application needs to wait for the workflow to move to a step where it is waiting for a message from the application.

In the latter case, the application will periodically check the workflow state to see if it is ready to receive a message, or still processing the previous message.    In this state, the application is still able to update the workflow context object, but it is not able to tell the workflow to move to the next step.  In this state the application can update the workflow through the `_updateWorflow()` API call.

If the workflow is waiting for a message from the application, the application is now free to send a message to the workflow to move it to the next state by calling the `_advanceWorflow()` API call.  If the workflow is actually not in a state to receive this, an error will be returned.  The application can always call `_updateWorkflow()` to update rthe workflow context object instead, but this will not advance the workflow.

To determine if the workflow is ready to receive a message, the context property `readyForMessage` is set to a non-null value; if the workflow is processing a previous message and is not ready to receive a message, this is set to null.  The application will check this property when the qworkflow is queried; if null, the application will automatically re-query the workflow after a period of time to see if the value has changed.

To terminate the workflow, the application can use `_terminateWorkflow()`.

<a name="workflow-details">

### Workflow Details
</a>

#### Workflow Design

The workflow itself needs to follow a certain design pattern which ensures that the front end application and the workflow integrate properly.

In general, the workflow will wait for messages from the front end application by waiting at Intermediate Message Event points.  Just prior to this, the workflow will set the `readyForMessage` context property to a value indicatihg the event the workflow will wait for.  The workflow always has two standard initial Intermediate Message Event point to tidy up: a `Confirm Worflow Complete` event point, and a `Wait for Final Dismiss` event point.  These are used by the front end application to tidy up and ensure that any resources etc. are removed as required.

Beyond these two event points, the workflow can use as many other intermediate event points as required.  In the template example supplied, there are 6 event points in total:

1. Wait for Due Date
2. Wait for Leave Request
3. Wait for Manager Discussion
4. Wait for Feedback
5. Confirm Workflow Complete
6. Wait for Final Dismiss

In between these event points, the workflow can create user tasks, call service end points, execute scripts etc.

Before each of the event points, a script task should ensure the following:

1. the `readyForMessage` property is set to match the message event that is expected
2. the `state` property is set so that the application knows the current state of the workflow
3. any other context properties ar eset to values that might need to be reflected in the UI

For example, prior to the `Wait for Manager Discussion` event, the script file does the following:

```
$.context.journeyApp.state = "waitForManagerDiscussionRequest";
$.context.journeyApp.readyForMessage = "wait_for_manager_discussion";
$.context.journeyApp.progress = "Waiting for manager discussion details";

$.context.journeyApp.discussLeave.hours = [];
$.context.journeyApp.discussLeave.durations = [];

for (var i = 7; i < 19; i++) {
    $.context.journeyApp.discussLeave.hours.push({
        text: i + ":00",
    });
    $.context.journeyApp.discussLeave.hours.push({
        text: i + ":30",
    });
    $.context.journeyApp.discussLeave.durations.push({
        text: i - 7 + "h",
    });
}

$.context.journeyApp.discussLeave.locations = [
    {
        text: "WDF03 IU.20 (Venice)"
    },
    {
        text: "WDF03 IU.25 (Your Office)"
    }
];

$.context.journeyApp.healthReminder.duereminder = [
    {
        text: "1 day after due date"
    },
    {
        text: "1 week after due date"
    },
    {
        text: "2 weeks after due date",
    },
    {
        text: "4 weeks after due date",
    }
]
```

Here you can see that the `readyForMessage` and `state` properties are set.  [ The `progress` property is set, but this is not used currently. ]. In addition, the (sub)properties `hours`, `durations`, `locations` and `dueReminder` are set so that the UI i nthe front end application can display suitable value helps.  In this example, these values are staitcally set, but you could imagine a case where these values are determined by calling an external service.

After the workflow receives a message to move it from the intermediate message event point, a script is executed that does the following:

1. the `readyForMessage` property is set to null, indicating that the workflow is now processing addtional steps
2. the `state` property is set so the application can perform any state adjustments (e.g. to the UI) that make sense
3. the workflow has the opportunity to validate any new context values set when the message was delivered, and set the sub-step `status` property accordingly

The workflow has the opportunity at this point to detect an error in the supplied values, and if so loop back and indicate the error in the sub-step `status` property (set to `error`) and provide a failure message in `errorMsg`.  If no error is detected, the workflow can set the `status` to `inprocess` if further steps are needed to complete the processing, or immediately set the `status` to `complete`.  For example, after the `Wait for Manager Discussion` event, the script does:

```
$.context.journeyApp.discussLeave.status = "inprocess"

$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.state = "receivedManagerDiscussionMeetingRequest";
$.context.journeyApp.progress = "Waiting for Manager to confirm Meeting request";
```

So we set `status` for the sub-step to `complete`.  Another example that shows error handling is after the `Wait for Leave Request` event, where the script look slike:

```
if (!$.context.journeyApp.leaveRequest.date ||
    !$.context.journeyApp.leaveRequest.date.start ||
    !$.context.journeyApp.leaveRequest.date.end) {
    $.context.journeyApp.leaveRequest.status = "error";
    $.context.journeyApp.leaveRequest.errorMsg = "";
} else {
    // convert date strings to Dates
    $.context.journeyApp.leaveRequest.startDate = new Date($.context.journeyApp.leaveRequest.date.start);
    $.context.journeyApp.leaveRequest.endDate = new Date($.context.journeyApp.leaveRequest.date.end);
    if ($.context.journeyApp.leaveRequest.startDate.getMonth() === 7) {
        $.context.journeyApp.leaveRequest.status = "error";
        $.context.journeyApp.leaveRequest.errorMsg = "Sorry your leave request cannot start in August - please provide an alternative date";
    } else {
        $.context.journeyApp.leaveRequest.status = "inprocess";
    }
}

$.context.journeyApp.state = "receivedLeaveRequest";
$.context.journeyApp.readyForMessage = null;
$.context.journeyApp.progress = "Leave Request Details Supplied";
```

Here the code might set the `status` to `error` and supply the reason in `errorMsg`.  Else the `status` is set to `inprocess`.

<a name="lifecycle">

### Lifecycle
</a>

1. Application Start-up
2. User-driven events
3. Termination

#### 1. Application Start-up

When the application first starts, it will query the Workflow for existing workflow instances.  If none are found, it will assume the application is in the initial state, and configure a 'default' context object.  The UI will be rendered based on this initial context object.

If there is a workflow instance running, the application will retrieve the context object that is currenrly associated with the workflow instance, and the UI will bind to that.

To query the workflow, the application uses `_queryWorkflow()`

#### 2. User-driven events

Ater the application starts, and there is a valid workflow instance, it will set the context object to the value retrieved from the workflow.

At this point the UI binds to the retrieved context object, and will set the current wizard step, etc.

If the workflow is not waiting for a message (`readyForMessage` is null), and the application is polling to check status, then the UI should only allow 'local' changes to be made to the UI, that can be persisted in the workflow via calls to `_updateWorkflow()`.  Later, when the workflow is triggered to move to a new step, these updates to the context coul dbe used by the workflow itself.  They could even be just relevant to the appolication with no workflow relevance - we just use the workflow context to persist the values (so that when the application is restarted we can retrieve the values from the running workflow instance).

If the workflow is waiting for a messahe (`readyForMessage` is non-null), then the UI can trigger an event that can result in the workflow beihng advanced to a new stage - through the `_advanceWorkflow()` API call.

It is up to the application developer to decide if UI events should result in a new message to the workflow triggering it to move to a new step; or if UI events just result in 'locally' gathered context that is persisted in the context object but has no effect on the workflow (beyond just updating the context object).  For example, you may just want to lead the user through some steps that encourage him/her to look at external content (via links to web sites, for example).  These steps will not trigger any workflow activity, but you want to track the progress through these links so you expose them via UI controls, and remember the current staep in the workflow context.

On the other hand, some UI events will trigger the workflow to do some activity and move to a new step. Fr example, the workflow might create a user task that requires some external approval - this requires a mesage from the applcuation telling the workflow to move to the next stage, and creat the necssary user tasks.

Each workflow will have its own requirements here.  The template one provded shows various combinations.

#### 3. Termination

Eventually, the workflow will reach a natural end point.  This is handled through two steps in the workflow.  The first one waits for a 'confirm complete' message.  When the workflow reaches this point, all user input for the workflow has been received, and the UI should show the application waiting for the user to confirm this by clicking on the Complete button.

After this, the workflow waits for a dismiss event.  The application will now be prsenting a 'finalise' screen that asks the buser if all documents uploaded during the workflow can be deleted, and whether the workflow can be terminated.  When this is done, the workflow is terminated, and the application will re-query the workflow and there shouldbe no instance running, so the applciation will now reset.

Note that the application has no need itself to terminate the workflow directly: the workflow will terminate itself.

<a name="rolling-your-own">

## Rolling Your Own
</a>

<a name="ryo-introduction">

### Introduction
</a>

As with the template application you need to dewcide what major events the workflow will be waiting for.  Each event needs to be configred as descrtibed in the earlier section on Workflow Design, with a suitable setup script and a script that handles the post processing aftera message event is received.

Between events, the workflow can call services or execute script tasks as appropriate.

<a name="ryo-ui-changes">

### UI Changes
</a>

Typically, you would enhance the UI by adding/modifyihng wizard steps in the `Main.view.xml` file, and then adding/modifying sub-steps in the appropriate wizard step. Each sub-step should be added to its own fragment, and (for clarify) named appropriately, e.g. `step1_1_consultation.fragment.xml` (for sub-step 1 in wizard step 1, handling the consultation step).

<a name="ryo-controller-changes">

### Controller Changes
</a>

New UI events need suitable handlers in the controller.  Also, if state changes in the wirjflow need updates to be made to the context object, they can be done in suitable state handlers.

<a name="ryo-workflow-changes">

### Workflow Changes
</a>

<a name="building-in-bas">

## Building in SAP Buisness Application Studio or Locally
</a>

<a name="bas-requirements">

### Requirements
</a>

Prior to building and deploying the package, it will be necessary to install SAP's UI5 tools.  On BAS, you can do this by ensuring that your dev space includes the necssary UI5 tooling as part of the configuration.

For a local system, follow the installation instructions here:

<a href="https://sap.github.io/ui5-tooling/">UI5 Tooling</a>

To verify that the UI5 tooling is deployed, simply execute

```
ui5 -v
```

This should return the currently installed version number of UI5.  If this fails to execute, then UI5 is not available and will need to be installed.


<a name="bas-building-and-deploying">

### Building and Deploying
</a>
To deploy the solution to SAP Work Zone, you will need to create a deployable package.  To do this, you must first install the necessary `npm` packages at the root of the directory tree:

```
npm i
```

After this, you can use the command `npm run build-all` to build the necessary components.

The end result should be a file called `package.zip` which can then be uploaded as a content package into SAP Work Zone.
