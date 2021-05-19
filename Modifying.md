# How To Guide for Workflow Template Application

Chris Jobson
27th April 2021

# Table of Contents {#table-of-contents .TOC-Heading}

[Introduction](#introduction)

[Modify the workflow with no difference to the sync points](#modify-the-workflow-with-no-difference-to-the-sync-points)

[Modify the application UI with no difference to the sync points](#modify-the-application-ui-with-no-difference-to-the-sync-points)

[Add new sync points](#add-new-sync-points)

# Introduction

There are different ways to extend or modify behaviour.

1)  Modify the **[workflow]{.ul}** with no difference to the sync points

2)  Modify the **[application UI]{.ul}** with no difference to the sync
    points

3)  Add new sync points

Leaving the sync points alone means that the application and workflow
can be independently modified but still work together. Effectively the
application and workflow fit together and will continue to work.

# Modify the **[workflow]{.ul}** with no difference to the sync points

The underlying workflow can be adjusted easily if there are no changes
to the sync points. In this case, simply add extra steps in the
workflow. For example, if we look at the example workflow, we see this:

![](media/Picture5.png)

This sequence of steps simply adds a 'delay' to the workflow to simulate
what might happen if we were to initiate an interaction with an external
system. Obviously, in an actual customer landscape this would be changed
to a more realistic scenario. For example, assume we want to create an
incident in Service Now, we could simply replace the above 'Simulate
SNOW' step with an actual external API call to the SNOW systems:

![](media/Picture6.png)

Alternatively, you could easily just add extra workflow steps in here --
including tasks for approval for example -- with no impact on the UI at
all.

The main thing to note is that when adding additional workflow steps,
provided the Intermediate Message event points are untouched, you can
add as many extra steps as you want.

# Modify the **[application UI]{.ul}** with no difference to the sync points

In this case, simply add more UI steps, and after each UI step is
complete simply update the context object (no need to advance the
workflow unless required).

For example, let's add a new sub-step that simply captures additional
information. To do this, perform the following steps:

1)  Decide on a name for the sub-step (this will then be used as a
    property in the context object to place additional properties that
    are captured in the sub-step)

2)  Create an initialization definition for the property in the
    configuration init file.

3)  Add a new fragment corresponding to the sub-step

4)  Reference this fragment in the wizard step

5)  Add to the controller any event handers triggered by button's etc.
    added to the sub-step.

6)  If necessary, adjust any workflow scripts or service tasks/user
    tasks to reference the context object properties affected by this
    sub-step.

The new sub-step would be implemented via a fragment that then defines
the UI that binds to the new sub-step property. To make this concrete,
let's modify the existing template application by adding a sub-step in
main step 2 to capture the employee's doctor/physician details.

1)  Let's call the sub-step 'doctorDetails'

2)  Let's define this in the init for the context object:

    ![](media/Picture7.png)

3)  Let's create a new fragment 'step2_5\_doctorDetails.fragment.xml'
    
    ![](media/Picture8.png)

4)  Let's reference this from the wizard XML:
    
    ![](media/Picture9.png)

5)  Let's create the event handler in the controller:

    ![](media/Picture10.png)

    In this case, we simply persist the data in the workflow and do
    nothing else

# Add new sync points

In this case, you need to decide how to add new sync points that are
reflected in the UI and the workflow.
