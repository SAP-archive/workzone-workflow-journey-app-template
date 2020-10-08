{
	"contents": {
		"3e15c038-39c4-468e-b690-0fb359d88a9a": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupContext.js",
			"id": "scripttask1",
			"name": "Setup Context"
		},
		"b1e84a3f-fc33-4d75-86e0-6e1526f5c870": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": -57.00000357627869,
			"y": 305,
			"width": 100,
			"height": 60,
			"object": "3e15c038-39c4-468e-b690-0fb359d88a9a"
		},
		"9873f7ad-940c-4375-bcfc-c92a718d2603": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 565.9999952316284,
			"y": 46.000000298023224,
			"width": 100,
			"height": 60,
			"object": "a69f47f3-d148-4854-a66d-b1230e4bc887"
		},
		"48cafb91-f21d-45d7-9eb2-44e8cd4daa02": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/ValidateResponse.js",
			"id": "scripttask5",
			"name": "Validate SNOW Response"
		},
		"10fb63ed-0291-4523-bd3f-d371310d4b9f": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "next_step",
			"id": "message10"
		},
		"90613ffc-d409-4436-99b4-020835af13a4": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "step3",
			"id": "message4"
		},
		"3b2b8e88-bb80-4736-ab71-14321924ade3": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow54",
			"name": "Leave Request OK",
			"sourceRef": "3963a686-f8dc-4eed-b0cf-71e158841664",
			"targetRef": "a69f47f3-d148-4854-a66d-b1230e4bc887"
		},
		"83d8099d-2d1e-4fc3-b7bf-5f8f16361164": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 2153.9999916553497,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "abaa8587-1817-44d6-bc0b-6f2fd2bc322b"
		},
		"fd7f5cf8-6289-43a0-aa19-6ae79168854c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow30",
			"name": "SequenceFlow30",
			"sourceRef": "13b89e31-0ea2-418b-b7bc-9529eb710a35",
			"targetRef": "3963a686-f8dc-4eed-b0cf-71e158841664"
		},
		"ed4cabea-98c1-4a25-b3ac-2671390cc42c": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "step1",
			"id": "message2"
		},
		"abaa8587-1817-44d6-bc0b-6f2fd2bc322b": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/CompleteWorkflow.js",
			"id": "scripttask8",
			"name": "Complete Workflow"
		},
		"8b7d70aa-a814-4fde-abe6-8a79bd44ebd9": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1225.9999964237213,356 1320,356 1320,213 535,213 535,76 615.9999952316284,76.00000029802322",
			"sourceSymbol": "617da9a6-5267-4e0e-8ff9-457962df7290",
			"targetSymbol": "9873f7ad-940c-4375-bcfc-c92a718d2603",
			"object": "3b2b8e88-bb80-4736-ab71-14321924ade3"
		},
		"568e960c-93e8-41cf-85e5-e25ea51cf73e": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": -151.0000023841858,
			"y": 319.0000002980232,
			"width": 32,
			"height": 32,
			"object": "0a32bfb6-406a-4f72-8c3d-7bbd657b2768"
		},
		"07c8354c-99a7-4d90-835a-8cc0ed61393c": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "step2",
			"id": "message3"
		},
		"98d117c2-dc67-4f9e-b72a-3fd532aac62a": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "request",
			"id": "message5"
		},
		"617da9a6-5267-4e0e-8ff9-457962df7290": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1204.9999964237213,
			"y": 335,
			"object": "3963a686-f8dc-4eed-b0cf-71e158841664"
		},
		"13b89e31-0ea2-418b-b7bc-9529eb710a35": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/ValidateLeaveRequest.js",
			"id": "scripttask2",
			"name": "Validate Leave Request Message",
			"documentation": "Check message received is OK"
		},
		"768d2160-68cb-4095-989a-7b3cd5152043": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent4",
			"name": "Wait for Leave Request",
			"documentation": "Gather information for the leave request in order to initiate the parental leave approval flow",
			"eventDefinitions": {
				"f7b048e8-985d-43ce-a6f6-f3195935d06f": {}
			}
		},
		"f7b048e8-985d-43ce-a6f6-f3195935d06f": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"responseVariable": "${context.journeyApp}",
			"id": "messageeventdefinition4",
			"messageRef": "9144a3b5-78a5-4d10-80d7-7f1ef4404835"
		},
		"8ab879d9-a8a6-4642-8122-bf45f005fa54": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "confirm_error",
			"id": "message7"
		},
		"1add2129-5a0d-4d29-b016-2fd23c34eba5": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 859.9999940395355,
			"y": 326.0000002980232,
			"width": 32,
			"height": 32,
			"object": "768d2160-68cb-4095-989a-7b3cd5152043"
		},
		"3eee42ac-75f1-4314-b420-2c80cacf1ce3": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 2071.9999916553497,
			"y": 127,
			"width": 32,
			"height": 32,
			"object": "b6987ac3-3739-4e02-87db-fc18b09d3738"
		},
		"0643785e-6217-4121-9ff9-e34a041c5aa3": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"b1e84a3f-fc33-4d75-86e0-6e1526f5c870": {},
				"9873f7ad-940c-4375-bcfc-c92a718d2603": {},
				"83d8099d-2d1e-4fc3-b7bf-5f8f16361164": {},
				"8b7d70aa-a814-4fde-abe6-8a79bd44ebd9": {},
				"568e960c-93e8-41cf-85e5-e25ea51cf73e": {},
				"617da9a6-5267-4e0e-8ff9-457962df7290": {},
				"1add2129-5a0d-4d29-b016-2fd23c34eba5": {},
				"3eee42ac-75f1-4314-b420-2c80cacf1ce3": {},
				"a5b74ef0-93d2-441c-a281-28156bbb222d": {},
				"bd5f0594-e831-4b21-bb18-efb23cf0cfcf": {},
				"a70ac3bf-2c9f-4b98-a467-8c8f0e8e66ea": {},
				"bd6af2cb-f03f-46a5-a0f9-c68e7f4de38b": {},
				"a1b6e9df-4410-43e0-9003-feebcf9efb3b": {},
				"f845f7eb-487d-48cc-ad41-fbcf0639ae19": {},
				"d21e387d-65b3-4389-8b05-1368f30f9df1": {},
				"019d9eeb-b5e0-410f-a725-cb452b7b4176": {},
				"5188eeea-a5b8-4190-a3d8-1a11627d45ff": {},
				"0c1151d0-31dd-43ea-9edf-5724e4dd4a4d": {},
				"9a2992c7-58d4-462b-9393-e733d688dc0a": {},
				"82eea589-ba64-4c05-ae61-cdf0e3648121": {},
				"81341e77-f97b-4cc4-95c0-ffc35e5a6f6b": {},
				"39b85c35-39b9-4657-9926-d7aa6b662d7c": {},
				"80aa76c2-8364-4bb7-ba83-a16bc08bd9c3": {},
				"5d67a3c6-55a9-43a9-93a3-535bad7d0ccc": {},
				"d4d29236-ad86-40ba-8e17-2f2cdde36d63": {},
				"9bdeec32-254d-42a2-89f5-0617b50a27b3": {},
				"81f9ed6e-cb90-49bf-a110-4df86ae1e303": {},
				"db96bde5-3f54-48eb-b65c-59fa1abd42f7": {},
				"e174b7ae-cdf6-4c9d-afd2-d7a2ce056963": {},
				"bdb905b8-70a2-45e4-a466-aa4027db4f70": {},
				"7aeff24e-c946-4058-9790-23a59470c08b": {},
				"811e7a69-7f6c-4971-ba04-b6cca6d2896a": {},
				"17d26c1a-c6c1-417b-aa7b-931180232a44": {},
				"2e720dd4-8864-4b37-ba18-bdde07ad719e": {},
				"3b292403-b09d-4833-861a-b05379e6259b": {},
				"b38cf82c-b8e4-49cb-a589-99e02836a0a4": {},
				"ada2e9c6-3114-4a9b-8135-f79abf3bbede": {},
				"01c6129f-3d65-4d02-a5b6-f39918d4982c": {},
				"e1e72ff9-e384-401b-a329-b01af9f06cca": {},
				"f1a40e3f-15cc-45c4-ba0c-7b0076e7e3b1": {},
				"649ab026-1b3e-4254-af48-201b620a3cbc": {},
				"f80de18c-c81a-49a5-8e84-7e5baa49f941": {},
				"9f5c54b2-0148-4c21-b2ca-202986fe7dd3": {},
				"600de341-7359-4396-962a-5eeabb4a40cd": {},
				"bafca13b-dd54-4422-af25-7b5adab70214": {},
				"bd0c29f2-dadc-45f5-9024-02f3ea4000ae": {},
				"1f8f55fd-402d-4bd1-bb31-0e59a7e80c76": {},
				"dc2d0701-4e04-4a2b-8281-402de28e30ef": {},
				"462d8f87-f0ff-43fb-b6c5-a84739f33d40": {},
				"58a71b6b-9793-4446-8910-7fe1f554ea27": {},
				"58d504dd-922d-4496-92f1-f0fc2e762600": {},
				"ff8a696b-1e09-44a2-b06b-d1990ab95f73": {},
				"c68f6f47-e96d-4750-92aa-6ce44294358b": {},
				"240422d2-800c-4c57-a384-800ab972a91e": {},
				"63c36a4d-e874-4db0-b9a0-45d2ca46bf17": {},
				"bb669d04-2635-4322-88c8-d4fb1c9bc2a0": {},
				"9273a424-dca1-4ca3-8946-e53f61947fcd": {},
				"87735b0a-4d6e-450c-9e8a-05baa51511c2": {},
				"45bd0737-ce78-4ba9-a46e-f89374a784d6": {},
				"78219b9a-cfa0-4ab8-9c21-2d8773a5c4dc": {},
				"9616f8fa-74d3-49fb-a295-7fd1178285b4": {},
				"75d3bcb1-f2c2-4b35-ac59-5336374b9ea9": {},
				"b0601057-8176-40ae-ad8a-e1d03f7595da": {},
				"e258eb7d-38c4-440f-bfc3-433d17112cbb": {},
				"27f50cbc-6eb1-4bfd-a027-551d22a8dd47": {}
			}
		},
		"a5b74ef0-93d2-441c-a281-28156bbb222d": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "891.9999940395355,342.0000002980232 921,342 921,334 949.9999928474426,334",
			"sourceSymbol": "1add2129-5a0d-4d29-b016-2fd23c34eba5",
			"targetSymbol": "bd5f0594-e831-4b21-bb18-efb23cf0cfcf",
			"object": "c6dee3e0-3c1f-4153-a7b1-852bc8e2f3a7"
		},
		"bd5f0594-e831-4b21-bb18-efb23cf0cfcf": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 949.9999928474426,
			"y": 314,
			"width": 100,
			"height": 60,
			"object": "13b89e31-0ea2-418b-b7bc-9529eb710a35"
		},
		"a70ac3bf-2c9f-4b98-a467-8c8f0e8e66ea": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "949.9999928474426,356 1246.9999964237213,356",
			"sourceSymbol": "bd5f0594-e831-4b21-bb18-efb23cf0cfcf",
			"targetSymbol": "617da9a6-5267-4e0e-8ff9-457962df7290",
			"object": "fd7f5cf8-6289-43a0-aa19-6ae79168854c"
		},
		"bd6af2cb-f03f-46a5-a0f9-c68e7f4de38b": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 515.9999964237213,
			"y": 314,
			"width": 100,
			"height": 60,
			"object": "48cafb91-f21d-45d7-9eb2-44e8cd4daa02"
		},
		"a1b6e9df-4410-43e0-9003-feebcf9efb3b": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "2103.9999916553497,143 2153.9999916553497,143",
			"sourceSymbol": "3eee42ac-75f1-4314-b420-2c80cacf1ce3",
			"targetSymbol": "83d8099d-2d1e-4fc3-b7bf-5f8f16361164",
			"object": "2e12f316-70c3-46d5-8ae3-3fa0ce47dc2c"
		},
		"f845f7eb-487d-48cc-ad41-fbcf0639ae19": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 685.9999952316284,
			"y": 307.0000002980232,
			"width": 100,
			"height": 60,
			"object": "bd351301-b0e8-444d-b7f3-bc084cbddf0c"
		},
		"d21e387d-65b3-4389-8b05-1368f30f9df1": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "785.999995279632,342.99998474121094 823.2500000480036,342.9999844431877 823.25,342 859.9999940395355,342.0000002980232",
			"sourceSymbol": "f845f7eb-487d-48cc-ad41-fbcf0639ae19",
			"targetSymbol": "1add2129-5a0d-4d29-b016-2fd23c34eba5",
			"object": "3bd3f30d-72cb-47c2-8cc9-27121cccaa57"
		},
		"019d9eeb-b5e0-410f-a725-cb452b7b4176": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 899.9999928474426,
			"y": 40,
			"width": 100,
			"height": 60,
			"object": "1a993072-c45a-4829-91fe-2c60f7e0a35c"
		},
		"5188eeea-a5b8-4190-a3d8-1a11627d45ff": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 230.9999988079071,
			"y": 296.0000002980232,
			"width": 100,
			"height": 60,
			"object": "162df8a4-bb11-4f61-893d-4dd2685f59b5"
		},
		"0c1151d0-31dd-43ea-9edf-5724e4dd4a4d": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "615.9999964237213,340.5000001490116 685.9999952316284,340.5000001490116",
			"sourceSymbol": "bd6af2cb-f03f-46a5-a0f9-c68e7f4de38b",
			"targetSymbol": "f845f7eb-487d-48cc-ad41-fbcf0639ae19",
			"object": "fa8cae11-886f-4092-9bb8-933a39210ed6"
		},
		"9a2992c7-58d4-462b-9393-e733d688dc0a": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 397.9999976158142,
			"y": 319.0000002980232,
			"width": 32,
			"height": 32,
			"object": "fc996498-9e90-444f-86ee-5e0759713691"
		},
		"82eea589-ba64-4c05-ae61-cdf0e3648121": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "330.9999988079071,326.0000002980232 364.75,326 364.75,335 397.9999976158142,335.0000002980232",
			"sourceSymbol": "5188eeea-a5b8-4190-a3d8-1a11627d45ff",
			"targetSymbol": "9a2992c7-58d4-462b-9393-e733d688dc0a",
			"object": "3c0d8fea-c2f1-4b29-8de5-9b229bee6994"
		},
		"81341e77-f97b-4cc4-95c0-ffc35e5a6f6b": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "429.9999976158142,335.0000002980232 473,335 473,344 515.9999964237213,344",
			"sourceSymbol": "9a2992c7-58d4-462b-9393-e733d688dc0a",
			"targetSymbol": "bd6af2cb-f03f-46a5-a0f9-c68e7f4de38b",
			"object": "735d26d5-7bda-4f24-8ec8-00c774d5acc9"
		},
		"39b85c35-39b9-4657-9926-d7aa6b662d7c": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 1225.9999916553497,
			"y": 127,
			"width": 32,
			"height": 32,
			"object": "079edf11-4764-46c5-8ccf-0d72c01945f4"
		},
		"80aa76c2-8364-4bb7-ba83-a16bc08bd9c3": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1072.9999916553497,
			"y": 40,
			"width": 100,
			"height": 60,
			"object": "d1af674d-5fa7-4c19-aa34-d013dbc2c99f"
		},
		"5d67a3c6-55a9-43a9-93a3-535bad7d0ccc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1172.9999916553497,70 1199.75,70 1199.75,143 1225.9999916553497,143",
			"sourceSymbol": "80aa76c2-8364-4bb7-ba83-a16bc08bd9c3",
			"targetSymbol": "39b85c35-39b9-4657-9926-d7aa6b662d7c",
			"object": "459e8795-c465-4ff8-a428-7c0f8810c5ab"
		},
		"d4d29236-ad86-40ba-8e17-2f2cdde36d63": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1305.9999916553497,
			"y": 118,
			"width": 100,
			"height": 60,
			"object": "d2977543-6a90-4663-a57e-73e46abf8443"
		},
		"9bdeec32-254d-42a2-89f5-0617b50a27b3": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1257.9999916553497,143 1282,143 1282,148 1305.9999916553497,148",
			"sourceSymbol": "39b85c35-39b9-4657-9926-d7aa6b662d7c",
			"targetSymbol": "d4d29236-ad86-40ba-8e17-2f2cdde36d63",
			"object": "0ec17133-6fe0-4032-a603-238c8bb1c237"
		},
		"81f9ed6e-cb90-49bf-a110-4df86ae1e303": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1921.9999916553497,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "b432b4ce-4382-4a1e-9cd3-d26a56c94599"
		},
		"db96bde5-3f54-48eb-b65c-59fa1abd42f7": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "2021.9999916553497,143 2071.9999916553497,143",
			"sourceSymbol": "81f9ed6e-cb90-49bf-a110-4df86ae1e303",
			"targetSymbol": "3eee42ac-75f1-4314-b420-2c80cacf1ce3",
			"object": "19654d1e-646d-4a42-87a7-4f9ee93b40a1"
		},
		"e174b7ae-cdf6-4c9d-afd2-d7a2ce056963": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 2303.9999916553497,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "74e1d668-eb9d-413f-9426-7f7fcc9ed6ef"
		},
		"bdb905b8-70a2-45e4-a466-aa4027db4f70": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "2253.9999916553497,143 2303.9999916553497,143",
			"sourceSymbol": "83d8099d-2d1e-4fc3-b7bf-5f8f16361164",
			"targetSymbol": "e174b7ae-cdf6-4c9d-afd2-d7a2ce056963",
			"object": "7f7314ee-efd0-49bc-989c-1e38d798e53d"
		},
		"7aeff24e-c946-4058-9790-23a59470c08b": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 2453.9999916553497,
			"y": 127,
			"width": 32,
			"height": 32,
			"object": "2319b5a4-55c3-4453-b9bc-69064ffe5a2b"
		},
		"811e7a69-7f6c-4971-ba04-b6cca6d2896a": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "2403.9999916553497,143 2453.9999916553497,143",
			"sourceSymbol": "e174b7ae-cdf6-4c9d-afd2-d7a2ce056963",
			"targetSymbol": "7aeff24e-c946-4058-9790-23a59470c08b",
			"object": "0c6d222d-4c40-40ab-bf54-a488fae8a408"
		},
		"17d26c1a-c6c1-417b-aa7b-931180232a44": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1229,356 1229,256.5 737,256.5 737,337",
			"sourceSymbol": "617da9a6-5267-4e0e-8ff9-457962df7290",
			"targetSymbol": "f845f7eb-487d-48cc-ad41-fbcf0639ae19",
			"object": "4fdee93b-83c2-49c7-addc-0638631a6a9e"
		},
		"2e720dd4-8864-4b37-ba18-bdde07ad719e": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 105,
			"y": 314,
			"object": "9ccece27-c8b0-482a-ad13-39a1af173688"
		},
		"3b292403-b09d-4833-861a-b05379e6259b": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "147,334.5000001490116 230.99999878795575,334.5000001490116",
			"sourceSymbol": "2e720dd4-8864-4b37-ba18-bdde07ad719e",
			"targetSymbol": "5188eeea-a5b8-4190-a3d8-1a11627d45ff",
			"object": "0998412f-fc48-4cf1-8799-c57994564e4c"
		},
		"b38cf82c-b8e4-49cb-a589-99e02836a0a4": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-57.00000357627869,331.5 147,331.5",
			"sourceSymbol": "b1e84a3f-fc33-4d75-86e0-6e1526f5c870",
			"targetSymbol": "2e720dd4-8864-4b37-ba18-bdde07ad719e",
			"object": "a32d6b29-4c5e-4fcb-9703-562a7b643c46"
		},
		"ada2e9c6-3114-4a9b-8135-f79abf3bbede": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": -16.00000238418579,
			"y": 161.00000029802322,
			"width": 32,
			"height": 32,
			"object": "1519ff56-9dbd-4de6-9e5e-303f0455a218"
		},
		"01c6129f-3d65-4d02-a5b6-f39918d4982c": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": -180.0000011920929,
			"y": 40.000000298023224,
			"width": 100,
			"height": 60,
			"object": "b429a4c9-f764-40b2-9b80-ab43dc2de597"
		},
		"e1e72ff9-e384-401b-a329-b01af9f06cca": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "129,335 129,64 -127,64",
			"sourceSymbol": "2e720dd4-8864-4b37-ba18-bdde07ad719e",
			"targetSymbol": "01c6129f-3d65-4d02-a5b6-f39918d4982c",
			"object": "e4902ffb-38b2-4240-a4fd-d512629bea97"
		},
		"f1a40e3f-15cc-45c4-ba0c-7b0076e7e3b1": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-80.00000115563262,80 -1,80 -1,177",
			"sourceSymbol": "01c6129f-3d65-4d02-a5b6-f39918d4982c",
			"targetSymbol": "ada2e9c6-3114-4a9b-8135-f79abf3bbede",
			"object": "f25a76b7-fcb6-4d55-bdd5-7172747f339a"
		},
		"649ab026-1b3e-4254-af48-201b620a3cbc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-1.5,177 -1.5,325",
			"sourceSymbol": "ada2e9c6-3114-4a9b-8135-f79abf3bbede",
			"targetSymbol": "b1e84a3f-fc33-4d75-86e0-6e1526f5c870",
			"object": "ea13ab7a-7e7c-4efb-8c10-db55367219d4"
		},
		"f80de18c-c81a-49a5-8e84-7e5baa49f941": {
			"classDefinition": "com.sap.bpm.wfs.ui.IntermediateCatchEventSymbol",
			"x": 1689.9999916553497,
			"y": 127,
			"width": 32,
			"height": 32,
			"object": "e32b8d68-cefa-4223-9796-6fc1c14e8445"
		},
		"9f5c54b2-0148-4c21-b2ca-202986fe7dd3": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1539.9999916553497,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "35e782c0-aee0-4b56-9e80-1597e41eaaef"
		},
		"600de341-7359-4396-962a-5eeabb4a40cd": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1639.9999916553497,143 1689.9999916553497,143",
			"sourceSymbol": "9f5c54b2-0148-4c21-b2ca-202986fe7dd3",
			"targetSymbol": "f80de18c-c81a-49a5-8e84-7e5baa49f941",
			"object": "48b15d9c-a8a3-496a-aa52-4653a5c64f04"
		},
		"bafca13b-dd54-4422-af25-7b5adab70214": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1771.9999916553497,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "54ed0ce3-703b-43ea-b1bc-84c634f7035a"
		},
		"bd0c29f2-dadc-45f5-9024-02f3ea4000ae": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1721.9999916553497,143 1771.9999916553497,143",
			"sourceSymbol": "f80de18c-c81a-49a5-8e84-7e5baa49f941",
			"targetSymbol": "bafca13b-dd54-4422-af25-7b5adab70214",
			"object": "7259d6ca-ee84-4cec-a031-08926f4c7dbe"
		},
		"1f8f55fd-402d-4bd1-bb31-0e59a7e80c76": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1871.9999916553497,143 1921.9999916553497,143",
			"sourceSymbol": "bafca13b-dd54-4422-af25-7b5adab70214",
			"targetSymbol": "81f9ed6e-cb90-49bf-a110-4df86ae1e303",
			"object": "ae7dbd14-c279-4fda-a76c-5a398321d5e1"
		},
		"dc2d0701-4e04-4a2b-8281-402de28e30ef": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 735.9999940395355,
			"y": 40.000000298023224,
			"width": 100,
			"height": 60,
			"object": "66916ef9-036a-4a53-be4b-a3939522817d"
		},
		"462d8f87-f0ff-43fb-b6c5-a84739f33d40": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "665.9999952316284,73.00000029802322 735.9999940395355,73.00000029802322",
			"sourceSymbol": "9873f7ad-940c-4375-bcfc-c92a718d2603",
			"targetSymbol": "dc2d0701-4e04-4a2b-8281-402de28e30ef",
			"object": "4b1bc8bb-74e6-45d6-b0bb-6d58c5a74c50"
		},
		"58a71b6b-9793-4446-8910-7fe1f554ea27": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "835.9999940395355,70.00000029802322 850.9999998975545,70.00000022817399 850.999999892898,69 899.9999928427861,68.999999771826",
			"sourceSymbol": "dc2d0701-4e04-4a2b-8281-402de28e30ef",
			"targetSymbol": "019d9eeb-b5e0-410f-a725-cb452b7b4176",
			"object": "751cba4a-71ba-499c-877d-994dafa2e34b"
		},
		"58d504dd-922d-4496-92f1-f0fc2e762600": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 2592.5,
			"y": 126.5,
			"width": 35,
			"height": 35,
			"object": "47e07730-ad29-4301-8867-7af71a867dc0"
		},
		"ff8a696b-1e09-44a2-b06b-d1990ab95f73": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "2468,149 2604,149",
			"sourceSymbol": "7aeff24e-c946-4058-9790-23a59470c08b",
			"targetSymbol": "58d504dd-922d-4496-92f1-f0fc2e762600",
			"object": "41959983-2530-48c0-9a51-8447033d32db"
		},
		"c68f6f47-e96d-4750-92aa-6ce44294358b": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 937,
			"y": -93,
			"object": "419e1c62-3428-4fdf-bdbb-7bff06644880"
		},
		"240422d2-800c-4c57-a384-800ab972a91e": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "941,72 941,-5.75 958,-5.75 958,-72",
			"sourceSymbol": "019d9eeb-b5e0-410f-a725-cb452b7b4176",
			"targetSymbol": "c68f6f47-e96d-4750-92aa-6ce44294358b",
			"object": "a6727916-d76a-41b8-8251-a14b3998163d"
		},
		"63c36a4d-e874-4db0-b9a0-45d2ca46bf17": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "958,-74 1092,-74 1092,73",
			"sourceSymbol": "c68f6f47-e96d-4750-92aa-6ce44294358b",
			"targetSymbol": "80aa76c2-8364-4bb7-ba83-a16bc08bd9c3",
			"object": "5a62c131-6f4c-4214-8911-0411d0e8bc65"
		},
		"bb669d04-2635-4322-88c8-d4fb1c9bc2a0": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "958,-72 958,-154 768,-154 767.9999952316284,307.5000002980232",
			"sourceSymbol": "c68f6f47-e96d-4750-92aa-6ce44294358b",
			"targetSymbol": "f845f7eb-487d-48cc-ad41-fbcf0639ae19",
			"object": "d66cdf78-0d01-442d-9bad-987e7e4b90f7"
		},
		"9273a424-dca1-4ca3-8946-e53f61947fcd": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 1434,
			"y": -81,
			"width": 100,
			"height": 60,
			"object": "16293c7d-f125-4f4d-9d40-75d22048e32b"
		},
		"87735b0a-4d6e-450c-9e8a-05baa51511c2": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1355.9999916553497,148 1356,48.25 1474,48.25 1474,-59",
			"sourceSymbol": "d4d29236-ad86-40ba-8e17-2f2cdde36d63",
			"targetSymbol": "9273a424-dca1-4ca3-8946-e53f61947fcd",
			"object": "7ff328ab-97f6-4473-9450-c6a9ba4dadaf"
		},
		"45bd0737-ce78-4ba9-a46e-f89374a784d6": {
			"classDefinition": "com.sap.bpm.wfs.ui.ScriptTaskSymbol",
			"x": 1434,
			"y": -181,
			"width": 100,
			"height": 60,
			"object": "27e3e693-e7e7-48d2-8497-a05f70a881c5"
		},
		"78219b9a-cfa0-4ab8-9c21-2d8773a5c4dc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1501,-62 1501,-137",
			"sourceSymbol": "9273a424-dca1-4ca3-8946-e53f61947fcd",
			"targetSymbol": "45bd0737-ce78-4ba9-a46e-f89374a784d6",
			"object": "2f7b9540-22cf-42d4-94f5-a135290020b8"
		},
		"9616f8fa-74d3-49fb-a295-7fd1178285b4": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1580.5,
			"y": -172,
			"object": "90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee"
		},
		"75d3bcb1-f2c2-4b35-ac59-5336374b9ea9": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1484,-151 1601.5,-151",
			"sourceSymbol": "45bd0737-ce78-4ba9-a46e-f89374a784d6",
			"targetSymbol": "9616f8fa-74d3-49fb-a295-7fd1178285b4",
			"object": "7f7d9195-2f65-4418-b906-8812f05b2369"
		},
		"b0601057-8176-40ae-ad8a-e1d03f7595da": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1601.5,-151 1601.5,-304 1142,-304 1142,62",
			"sourceSymbol": "9616f8fa-74d3-49fb-a295-7fd1178285b4",
			"targetSymbol": "80aa76c2-8364-4bb7-ba83-a16bc08bd9c3",
			"object": "7bf0d711-a811-4f58-a04c-58756cd87f0b"
		},
		"e258eb7d-38c4-440f-bfc3-433d17112cbb": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1601.5,-151 1601.5,-8.5 1590,-8.5 1590,155",
			"sourceSymbol": "9616f8fa-74d3-49fb-a295-7fd1178285b4",
			"targetSymbol": "9f5c54b2-0148-4c21-b2ca-202986fe7dd3",
			"object": "d45e71ec-58bd-4a27-91de-f54d66baf677"
		},
		"27f50cbc-6eb1-4bfd-a027-551d22a8dd47": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "-132.50000178813934,335.0000002980232 -132.5,209.34524536132812 -131.9999988548699,209.3452448322699 -132.00000064300923,99.49999976896501",
			"sourceSymbol": "568e960c-93e8-41cf-85e5-e25ea51cf73e",
			"targetSymbol": "01c6129f-3d65-4d02-a5b6-f39918d4982c",
			"object": "68017fce-3ce1-4a7b-aecf-c8b392fa4459"
		},
		"9144a3b5-78a5-4d10-80d7-7f1ef4404835": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "request_leave",
			"id": "message8"
		},
		"a69f47f3-d148-4854-a66d-b1230e4bc887": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/PrepareLeaveRequest.js",
			"id": "scripttask9",
			"name": "Prepare Leave Request"
		},
		"900bc6e4-7ef9-448d-90f8-2c55d15775a1": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "journeyappworkflow2",
			"subject": "Example Journey App with Documents",
			"businessKey": "${context.businessKey}",
			"name": "JourneyAppWorkflow2",
			"documentation": "",
			"lastIds": "9144274f-dd63-49e0-83ae-7ffaf27d2bfa",
			"events": {
				"768d2160-68cb-4095-989a-7b3cd5152043": {
					"name": "Wait for Leave Request"
				},
				"0a32bfb6-406a-4f72-8c3d-7bbd657b2768": {
					"name": "Start"
				},
				"b6987ac3-3739-4e02-87db-fc18b09d3738": {
					"name": "Confirm Workflow Complete"
				},
				"fc996498-9e90-444f-86ee-5e0759713691": {
					"name": "Simulate SNOW"
				},
				"079edf11-4764-46c5-8ccf-0d72c01945f4": {
					"name": "Wait for Manager Discussion"
				},
				"2319b5a4-55c3-4453-b9bc-69064ffe5a2b": {
					"name": "Wait for Final Dismiss"
				},
				"1519ff56-9dbd-4de6-9e5e-303f0455a218": {
					"name": "Wait for Due Date"
				},
				"e32b8d68-cefa-4223-9796-6fc1c14e8445": {
					"name": "Wait for Feedback"
				},
				"47e07730-ad29-4301-8867-7af71a867dc0": {
					"name": "End Workflow"
				}
			},
			"activities": {
				"3e15c038-39c4-468e-b690-0fb359d88a9a": {
					"name": "Setup Context"
				},
				"48cafb91-f21d-45d7-9eb2-44e8cd4daa02": {
					"name": "Validate SNOW Response"
				},
				"abaa8587-1817-44d6-bc0b-6f2fd2bc322b": {
					"name": "Complete Workflow"
				},
				"13b89e31-0ea2-418b-b7bc-9529eb710a35": {
					"name": "Validate Leave Request Message"
				},
				"a69f47f3-d148-4854-a66d-b1230e4bc887": {
					"name": "Prepare Leave Request"
				},
				"3963a686-f8dc-4eed-b0cf-71e158841664": {
					"name": "Leave Request in Error?"
				},
				"bd351301-b0e8-444d-b7f3-bc084cbddf0c": {
					"name": "Setup For Wait for Leave Request"
				},
				"1a993072-c45a-4829-91fe-2c60f7e0a35c": {
					"name": "Validate SF Response"
				},
				"162df8a4-bb11-4f61-893d-4dd2685f59b5": {
					"name": "Prepare for SNOW"
				},
				"d1af674d-5fa7-4c19-aa34-d013dbc2c99f": {
					"name": "Prepare for Manager Discussion"
				},
				"d2977543-6a90-4663-a57e-73e46abf8443": {
					"name": "Confirm Manager Discussion Details"
				},
				"b432b4ce-4382-4a1e-9cd3-d26a56c94599": {
					"name": "Prepare For Confirm Workflow Complete"
				},
				"74e1d668-eb9d-413f-9426-7f7fcc9ed6ef": {
					"name": "Prepare for Final Dismiss"
				},
				"9ccece27-c8b0-482a-ad13-39a1af173688": {
					"name": "Check due date"
				},
				"b429a4c9-f764-40b2-9b80-ab43dc2de597": {
					"name": "Prepare for Wait for Due Date"
				},
				"35e782c0-aee0-4b56-9e80-1597e41eaaef": {
					"name": "Prepare for Feedback Upload"
				},
				"54ed0ce3-703b-43ea-b1bc-84c634f7035a": {
					"name": "Feedback Uploaded"
				},
				"66916ef9-036a-4a53-be4b-a3939522817d": {
					"name": "Approve Leave Request"
				},
				"419e1c62-3428-4fdf-bdbb-7bff06644880": {
					"name": "ExclusiveGateway6"
				},
				"16293c7d-f125-4f4d-9d40-75d22048e32b": {
					"name": "Confirm Meeting Request"
				},
				"27e3e693-e7e7-48d2-8497-a05f70a881c5": {
					"name": "CheckMeetingRequestDecision"
				},
				"90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee": {
					"name": "ExclusiveGateway7"
				}
			},
			"sequenceFlows": {
				"3b2b8e88-bb80-4736-ab71-14321924ade3": {
					"name": "Leave Request OK"
				},
				"fd7f5cf8-6289-43a0-aa19-6ae79168854c": {
					"name": "SequenceFlow30"
				},
				"c6dee3e0-3c1f-4153-a7b1-852bc8e2f3a7": {
					"name": "SequenceFlow28"
				},
				"2e12f316-70c3-46d5-8ae3-3fa0ce47dc2c": {
					"name": "SequenceFlow49"
				},
				"3bd3f30d-72cb-47c2-8cc9-27121cccaa57": {
					"name": "SequenceFlow58"
				},
				"fa8cae11-886f-4092-9bb8-933a39210ed6": {
					"name": "SequenceFlow80"
				},
				"3c0d8fea-c2f1-4b29-8de5-9b229bee6994": {
					"name": "SequenceFlow81"
				},
				"735d26d5-7bda-4f24-8ec8-00c774d5acc9": {
					"name": "SequenceFlow82"
				},
				"459e8795-c465-4ff8-a428-7c0f8810c5ab": {
					"name": "SequenceFlow85"
				},
				"0ec17133-6fe0-4032-a603-238c8bb1c237": {
					"name": "SequenceFlow86"
				},
				"19654d1e-646d-4a42-87a7-4f9ee93b40a1": {
					"name": "SequenceFlow91"
				},
				"7f7314ee-efd0-49bc-989c-1e38d798e53d": {
					"name": "SequenceFlow94"
				},
				"0c6d222d-4c40-40ab-bf54-a488fae8a408": {
					"name": "SequenceFlow96"
				},
				"4fdee93b-83c2-49c7-addc-0638631a6a9e": {
					"name": "Leave Request Message Not Valid"
				},
				"0998412f-fc48-4cf1-8799-c57994564e4c": {
					"name": "SequenceFlow105"
				},
				"a32d6b29-4c5e-4fcb-9703-562a7b643c46": {
					"name": "SequenceFlow106"
				},
				"e4902ffb-38b2-4240-a4fd-d512629bea97": {
					"name": "SequenceFlow109"
				},
				"f25a76b7-fcb6-4d55-bdd5-7172747f339a": {
					"name": "SequenceFlow110"
				},
				"ea13ab7a-7e7c-4efb-8c10-db55367219d4": {
					"name": "SequenceFlow113"
				},
				"48b15d9c-a8a3-496a-aa52-4653a5c64f04": {
					"name": "SequenceFlow114"
				},
				"7259d6ca-ee84-4cec-a031-08926f4c7dbe": {
					"name": "SequenceFlow116"
				},
				"ae7dbd14-c279-4fda-a76c-5a398321d5e1": {
					"name": "SequenceFlow117"
				},
				"4b1bc8bb-74e6-45d6-b0bb-6d58c5a74c50": {
					"name": "SequenceFlow118"
				},
				"751cba4a-71ba-499c-877d-994dafa2e34b": {
					"name": "SequenceFlow119"
				},
				"41959983-2530-48c0-9a51-8447033d32db": {
					"name": "SequenceFlow120"
				},
				"a6727916-d76a-41b8-8251-a14b3998163d": {
					"name": "SequenceFlow121"
				},
				"5a62c131-6f4c-4214-8911-0411d0e8bc65": {
					"name": "SequenceFlow122"
				},
				"d66cdf78-0d01-442d-9bad-987e7e4b90f7": {
					"name": "SequenceFlow123"
				},
				"7ff328ab-97f6-4473-9450-c6a9ba4dadaf": {
					"name": "SequenceFlow124"
				},
				"2f7b9540-22cf-42d4-94f5-a135290020b8": {
					"name": "SequenceFlow125"
				},
				"7f7d9195-2f65-4418-b906-8812f05b2369": {
					"name": "SequenceFlow126"
				},
				"7bf0d711-a811-4f58-a04c-58756cd87f0b": {
					"name": "SequenceFlow127"
				},
				"d45e71ec-58bd-4a27-91de-f54d66baf677": {
					"name": "SequenceFlow128"
				},
				"68017fce-3ce1-4a7b-aecf-c8b392fa4459": {
					"name": "SequenceFlow129"
				}
			},
			"diagrams": {
				"0643785e-6217-4121-9ff9-e34a041c5aa3": {}
			}
		},
		"0a32bfb6-406a-4f72-8c3d-7bbd657b2768": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "Start"
		},
		"b6987ac3-3739-4e02-87db-fc18b09d3738": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent9",
			"name": "Confirm Workflow Complete",
			"eventDefinitions": {
				"d5b5a3b9-c8e6-4297-b44e-e4abdc81f0f8": {}
			}
		},
		"fc996498-9e90-444f-86ee-5e0759713691": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatetimerevent5",
			"name": "Simulate SNOW",
			"eventDefinitions": {
				"13320713-7a28-4727-941d-424652a7b16e": {}
			}
		},
		"079edf11-4764-46c5-8ccf-0d72c01945f4": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent13",
			"name": "Wait for Manager Discussion",
			"eventDefinitions": {
				"e21d78ba-f4e7-49b9-bd3a-3bf9af1029d7": {}
			}
		},
		"2319b5a4-55c3-4453-b9bc-69064ffe5a2b": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent14",
			"name": "Wait for Final Dismiss",
			"eventDefinitions": {
				"dab6fefb-9caa-4e2c-9234-376268213993": {}
			}
		},
		"1519ff56-9dbd-4de6-9e5e-303f0455a218": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent15",
			"name": "Wait for Due Date",
			"eventDefinitions": {
				"83f9e042-bfd4-4c32-9011-471c5bc5e4b6": {}
			}
		},
		"e32b8d68-cefa-4223-9796-6fc1c14e8445": {
			"classDefinition": "com.sap.bpm.wfs.IntermediateCatchEvent",
			"id": "intermediatemessageevent16",
			"name": "Wait for Feedback",
			"eventDefinitions": {
				"99d5b747-41a8-4835-a7ae-75a06a3f7ecb": {}
			}
		},
		"47e07730-ad29-4301-8867-7af71a867dc0": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent9",
			"name": "End Workflow"
		},
		"3963a686-f8dc-4eed-b0cf-71e158841664": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway4",
			"name": "Leave Request in Error?",
			"default": "3b2b8e88-bb80-4736-ab71-14321924ade3"
		},
		"bd351301-b0e8-444d-b7f3-bc084cbddf0c": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupForWait.js",
			"id": "scripttask10",
			"name": "Setup For Wait for Leave Request"
		},
		"1a993072-c45a-4829-91fe-2c60f7e0a35c": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupForWait3.js",
			"id": "scripttask12",
			"name": "Validate SF Response"
		},
		"162df8a4-bb11-4f61-893d-4dd2685f59b5": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupContext2.js",
			"id": "scripttask15",
			"name": "Prepare for SNOW"
		},
		"d1af674d-5fa7-4c19-aa34-d013dbc2c99f": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/PrepareForManagerDiscussion.js",
			"id": "scripttask16",
			"name": "Prepare for Manager Discussion"
		},
		"d2977543-6a90-4663-a57e-73e46abf8443": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/ValidateManagerDiscussionDetails.js",
			"id": "scripttask17",
			"name": "Confirm Manager Discussion Details"
		},
		"b432b4ce-4382-4a1e-9cd3-d26a56c94599": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupForWait4.js",
			"id": "scripttask19",
			"name": "Prepare For Confirm Workflow Complete"
		},
		"74e1d668-eb9d-413f-9426-7f7fcc9ed6ef": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/FinalDismiss.js",
			"id": "scripttask20",
			"name": "Prepare for Final Dismiss"
		},
		"9ccece27-c8b0-482a-ad13-39a1af173688": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway5",
			"name": "Check due date",
			"default": "0998412f-fc48-4cf1-8799-c57994564e4c"
		},
		"b429a4c9-f764-40b2-9b80-ab43dc2de597": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupForWait5.js",
			"id": "scripttask21",
			"name": "Prepare for Wait for Due Date"
		},
		"35e782c0-aee0-4b56-9e80-1597e41eaaef": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/SetupForWaitForFeedback.js",
			"id": "scripttask22",
			"name": "Prepare for Feedback Upload"
		},
		"54ed0ce3-703b-43ea-b1bc-84c634f7035a": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/ConfirmFeedbackUpload.js",
			"id": "scripttask23",
			"name": "Feedback Uploaded"
		},
		"66916ef9-036a-4a53-be4b-a3939522817d": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Please Approve Parental Leave Request",
			"priority": "HIGH",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapbpmworkflow.comsapbpmwusformplayer/com.sap.bpm.wus.form.player",
			"recipientUsers": "${context.journeyApp.leaveRequest.approver}",
			"formReference": "/forms/JourneyApp/approveLeaveRequest.form",
			"userInterfaceParams": [{
				"key": "formId",
				"value": "approveleaverequest"
			}, {
				"key": "formRevision",
				"value": "1.0"
			}],
			"customAttributes": [],
			"id": "usertask2",
			"name": "Approve Leave Request"
		},
		"419e1c62-3428-4fdf-bdbb-7bff06644880": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway6",
			"name": "ExclusiveGateway6",
			"default": "5a62c131-6f4c-4214-8911-0411d0e8bc65"
		},
		"16293c7d-f125-4f4d-9d40-75d22048e32b": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Confirm Meeting Request For Leave Discussion",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://managerDiscussion.comsapwzjourneymanagerDiscussion/com.sap.wz.journey.managerDiscussion",
			"recipientUsers": "${context.journeyApp.leaveRequest.approver}",
			"userInterfaceParams": [],
			"id": "usertask3",
			"name": "Confirm Meeting Request"
		},
		"27e3e693-e7e7-48d2-8497-a05f70a881c5": {
			"classDefinition": "com.sap.bpm.wfs.ScriptTask",
			"reference": "/scripts/JourneyApp/CheckMeetingRequestDecision.js",
			"id": "scripttask24",
			"name": "CheckMeetingRequestDecision"
		},
		"90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway7",
			"name": "ExclusiveGateway7",
			"default": "d45e71ec-58bd-4a27-91de-f54d66baf677"
		},
		"c6dee3e0-3c1f-4153-a7b1-852bc8e2f3a7": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow28",
			"name": "SequenceFlow28",
			"sourceRef": "768d2160-68cb-4095-989a-7b3cd5152043",
			"targetRef": "13b89e31-0ea2-418b-b7bc-9529eb710a35"
		},
		"2e12f316-70c3-46d5-8ae3-3fa0ce47dc2c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow49",
			"name": "SequenceFlow49",
			"sourceRef": "b6987ac3-3739-4e02-87db-fc18b09d3738",
			"targetRef": "abaa8587-1817-44d6-bc0b-6f2fd2bc322b"
		},
		"3bd3f30d-72cb-47c2-8cc9-27121cccaa57": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow58",
			"name": "SequenceFlow58",
			"sourceRef": "bd351301-b0e8-444d-b7f3-bc084cbddf0c",
			"targetRef": "768d2160-68cb-4095-989a-7b3cd5152043"
		},
		"fa8cae11-886f-4092-9bb8-933a39210ed6": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow80",
			"name": "SequenceFlow80",
			"sourceRef": "48cafb91-f21d-45d7-9eb2-44e8cd4daa02",
			"targetRef": "bd351301-b0e8-444d-b7f3-bc084cbddf0c"
		},
		"3c0d8fea-c2f1-4b29-8de5-9b229bee6994": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow81",
			"name": "SequenceFlow81",
			"sourceRef": "162df8a4-bb11-4f61-893d-4dd2685f59b5",
			"targetRef": "fc996498-9e90-444f-86ee-5e0759713691"
		},
		"735d26d5-7bda-4f24-8ec8-00c774d5acc9": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow82",
			"name": "SequenceFlow82",
			"sourceRef": "fc996498-9e90-444f-86ee-5e0759713691",
			"targetRef": "48cafb91-f21d-45d7-9eb2-44e8cd4daa02"
		},
		"459e8795-c465-4ff8-a428-7c0f8810c5ab": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow85",
			"name": "SequenceFlow85",
			"sourceRef": "d1af674d-5fa7-4c19-aa34-d013dbc2c99f",
			"targetRef": "079edf11-4764-46c5-8ccf-0d72c01945f4"
		},
		"0ec17133-6fe0-4032-a603-238c8bb1c237": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow86",
			"name": "SequenceFlow86",
			"sourceRef": "079edf11-4764-46c5-8ccf-0d72c01945f4",
			"targetRef": "d2977543-6a90-4663-a57e-73e46abf8443"
		},
		"19654d1e-646d-4a42-87a7-4f9ee93b40a1": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow91",
			"name": "SequenceFlow91",
			"sourceRef": "b432b4ce-4382-4a1e-9cd3-d26a56c94599",
			"targetRef": "b6987ac3-3739-4e02-87db-fc18b09d3738"
		},
		"7f7314ee-efd0-49bc-989c-1e38d798e53d": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow94",
			"name": "SequenceFlow94",
			"sourceRef": "abaa8587-1817-44d6-bc0b-6f2fd2bc322b",
			"targetRef": "74e1d668-eb9d-413f-9426-7f7fcc9ed6ef"
		},
		"0c6d222d-4c40-40ab-bf54-a488fae8a408": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow96",
			"name": "SequenceFlow96",
			"sourceRef": "74e1d668-eb9d-413f-9426-7f7fcc9ed6ef",
			"targetRef": "2319b5a4-55c3-4453-b9bc-69064ffe5a2b"
		},
		"4fdee93b-83c2-49c7-addc-0638631a6a9e": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.journeyApp.leaveRequest.status == \"error\"}",
			"id": "sequenceflow98",
			"name": "Leave Request Message Not Valid",
			"sourceRef": "3963a686-f8dc-4eed-b0cf-71e158841664",
			"targetRef": "bd351301-b0e8-444d-b7f3-bc084cbddf0c"
		},
		"0998412f-fc48-4cf1-8799-c57994564e4c": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow105",
			"name": "SequenceFlow105",
			"sourceRef": "9ccece27-c8b0-482a-ad13-39a1af173688",
			"targetRef": "162df8a4-bb11-4f61-893d-4dd2685f59b5"
		},
		"a32d6b29-4c5e-4fcb-9703-562a7b643c46": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow106",
			"name": "SequenceFlow106",
			"sourceRef": "3e15c038-39c4-468e-b690-0fb359d88a9a",
			"targetRef": "9ccece27-c8b0-482a-ad13-39a1af173688"
		},
		"e4902ffb-38b2-4240-a4fd-d512629bea97": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.journeyApp.consultation.status == \"error\"}",
			"id": "sequenceflow109",
			"name": "SequenceFlow109",
			"sourceRef": "9ccece27-c8b0-482a-ad13-39a1af173688",
			"targetRef": "b429a4c9-f764-40b2-9b80-ab43dc2de597"
		},
		"f25a76b7-fcb6-4d55-bdd5-7172747f339a": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow110",
			"name": "SequenceFlow110",
			"sourceRef": "b429a4c9-f764-40b2-9b80-ab43dc2de597",
			"targetRef": "1519ff56-9dbd-4de6-9e5e-303f0455a218"
		},
		"ea13ab7a-7e7c-4efb-8c10-db55367219d4": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow113",
			"name": "SequenceFlow113",
			"sourceRef": "1519ff56-9dbd-4de6-9e5e-303f0455a218",
			"targetRef": "3e15c038-39c4-468e-b690-0fb359d88a9a"
		},
		"48b15d9c-a8a3-496a-aa52-4653a5c64f04": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow114",
			"name": "SequenceFlow114",
			"sourceRef": "35e782c0-aee0-4b56-9e80-1597e41eaaef",
			"targetRef": "e32b8d68-cefa-4223-9796-6fc1c14e8445"
		},
		"7259d6ca-ee84-4cec-a031-08926f4c7dbe": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow116",
			"name": "SequenceFlow116",
			"sourceRef": "e32b8d68-cefa-4223-9796-6fc1c14e8445",
			"targetRef": "54ed0ce3-703b-43ea-b1bc-84c634f7035a"
		},
		"ae7dbd14-c279-4fda-a76c-5a398321d5e1": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow117",
			"name": "SequenceFlow117",
			"sourceRef": "54ed0ce3-703b-43ea-b1bc-84c634f7035a",
			"targetRef": "b432b4ce-4382-4a1e-9cd3-d26a56c94599"
		},
		"4b1bc8bb-74e6-45d6-b0bb-6d58c5a74c50": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow118",
			"name": "SequenceFlow118",
			"sourceRef": "a69f47f3-d148-4854-a66d-b1230e4bc887",
			"targetRef": "66916ef9-036a-4a53-be4b-a3939522817d"
		},
		"751cba4a-71ba-499c-877d-994dafa2e34b": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow119",
			"name": "SequenceFlow119",
			"sourceRef": "66916ef9-036a-4a53-be4b-a3939522817d",
			"targetRef": "1a993072-c45a-4829-91fe-2c60f7e0a35c"
		},
		"41959983-2530-48c0-9a51-8447033d32db": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow120",
			"name": "SequenceFlow120",
			"sourceRef": "2319b5a4-55c3-4453-b9bc-69064ffe5a2b",
			"targetRef": "47e07730-ad29-4301-8867-7af71a867dc0"
		},
		"a6727916-d76a-41b8-8251-a14b3998163d": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow121",
			"name": "SequenceFlow121",
			"sourceRef": "1a993072-c45a-4829-91fe-2c60f7e0a35c",
			"targetRef": "419e1c62-3428-4fdf-bdbb-7bff06644880"
		},
		"5a62c131-6f4c-4214-8911-0411d0e8bc65": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow122",
			"name": "SequenceFlow122",
			"sourceRef": "419e1c62-3428-4fdf-bdbb-7bff06644880",
			"targetRef": "d1af674d-5fa7-4c19-aa34-d013dbc2c99f"
		},
		"d66cdf78-0d01-442d-9bad-987e7e4b90f7": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.journeyApp.leaveRequest.status == 'error'}",
			"id": "sequenceflow123",
			"name": "SequenceFlow123",
			"sourceRef": "419e1c62-3428-4fdf-bdbb-7bff06644880",
			"targetRef": "bd351301-b0e8-444d-b7f3-bc084cbddf0c"
		},
		"7ff328ab-97f6-4473-9450-c6a9ba4dadaf": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow124",
			"name": "SequenceFlow124",
			"sourceRef": "d2977543-6a90-4663-a57e-73e46abf8443",
			"targetRef": "16293c7d-f125-4f4d-9d40-75d22048e32b"
		},
		"2f7b9540-22cf-42d4-94f5-a135290020b8": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow125",
			"name": "SequenceFlow125",
			"sourceRef": "16293c7d-f125-4f4d-9d40-75d22048e32b",
			"targetRef": "27e3e693-e7e7-48d2-8497-a05f70a881c5"
		},
		"7f7d9195-2f65-4418-b906-8812f05b2369": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow126",
			"name": "SequenceFlow126",
			"sourceRef": "27e3e693-e7e7-48d2-8497-a05f70a881c5",
			"targetRef": "90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee"
		},
		"7bf0d711-a811-4f58-a04c-58756cd87f0b": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.journeyApp.discussLeave.status == \"error\"}",
			"id": "sequenceflow127",
			"name": "SequenceFlow127",
			"sourceRef": "90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee",
			"targetRef": "d1af674d-5fa7-4c19-aa34-d013dbc2c99f"
		},
		"d45e71ec-58bd-4a27-91de-f54d66baf677": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow128",
			"name": "SequenceFlow128",
			"sourceRef": "90bf4bfb-5e3a-4a98-8ebb-9e2d45dc3bee",
			"targetRef": "35e782c0-aee0-4b56-9e80-1597e41eaaef"
		},
		"68017fce-3ce1-4a7b-aecf-c8b392fa4459": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow129",
			"name": "SequenceFlow129",
			"sourceRef": "0a32bfb6-406a-4f72-8c3d-7bbd657b2768",
			"targetRef": "b429a4c9-f764-40b2-9b80-ab43dc2de597"
		},
		"d5b5a3b9-c8e6-4297-b44e-e4abdc81f0f8": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"responseVariable": "${context.journeyApp}",
			"id": "messageeventdefinition9",
			"messageRef": "9578b0ec-db68-4b8f-9ba5-f6096e0b416f"
		},
		"13320713-7a28-4727-941d-424652a7b16e": {
			"classDefinition": "com.sap.bpm.wfs.TimerEventDefinition",
			"timeDuration": "PT1M",
			"id": "timereventdefinition6"
		},
		"e21d78ba-f4e7-49b9-bd3a-3bf9af1029d7": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"responseVariable": "${context.journeyApp}",
			"id": "messageeventdefinition13",
			"messageRef": "38c5efa3-43ef-4c48-95c5-99efc111ffd7"
		},
		"dab6fefb-9caa-4e2c-9234-376268213993": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"id": "messageeventdefinition14",
			"messageRef": "d4bbe78a-83e6-4aa4-b2c8-30b9de1ea29c"
		},
		"83f9e042-bfd4-4c32-9011-471c5bc5e4b6": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"responseVariable": "${context.journeyApp}",
			"id": "messageeventdefinition15",
			"messageRef": "b03b1d09-49e4-4a51-b745-1421a6cacff4"
		},
		"99d5b747-41a8-4835-a7ae-75a06a3f7ecb": {
			"classDefinition": "com.sap.bpm.wfs.MessageEventDefinition",
			"responseVariable": "${context.journeyApp}",
			"id": "messageeventdefinition16",
			"messageRef": "d15b9ce1-5243-4943-902a-aae8c2b38676"
		},
		"bf666171-f12a-4eed-bd49-b5ce827f5806": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "Inbound1",
			"id": "message1"
		},
		"9578b0ec-db68-4b8f-9ba5-f6096e0b416f": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "confirm_complete",
			"id": "message11"
		},
		"9144274f-dd63-49e0-83ae-7ffaf27d2bfa": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"terminateeventdefinition": 4,
			"messageeventdefinition": 16,
			"message": 17,
			"timereventdefinition": 8,
			"maildefinition": 2,
			"sequenceflow": 130,
			"startevent": 1,
			"intermediatemessageevent": 16,
			"intermediatetimerevent": 7,
			"boundarytimerevent": 1,
			"endevent": 9,
			"usertask": 3,
			"servicetask": 10,
			"scripttask": 24,
			"mailtask": 2,
			"exclusivegateway": 7,
			"parallelgateway": 3
		},
		"178f6d4e-7012-4a1a-a978-ae3db25c00b4": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "test1",
			"id": "message9"
		},
		"3bccdf5b-c4ab-4628-a4b5-1479e930c558": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "xxxx",
			"id": "message12"
		},
		"38c5efa3-43ef-4c48-95c5-99efc111ffd7": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "wait_for_manager_discussion",
			"id": "message13"
		},
		"d4bbe78a-83e6-4aa4-b2c8-30b9de1ea29c": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "final_dismiss",
			"id": "message14"
		},
		"b03b1d09-49e4-4a51-b745-1421a6cacff4": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "consultation_message",
			"id": "message15"
		},
		"8905f240-9043-47fc-a701-1c0b164b80fa": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "wait_feedback",
			"id": "message16"
		},
		"d15b9ce1-5243-4943-902a-aae8c2b38676": {
			"classDefinition": "com.sap.bpm.wfs.Message",
			"name": "wait_for_feedback",
			"id": "message17"
		}
	}
}