import React, { useRef, useState } from "react";
import {
	DocumentEditorContainerComponent,
	Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
DocumentEditorContainerComponent.Inject(Toolbar);

registerLicense(
	"Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3RXxbf1x0ZFRMYlpbR3VPMyBoS35RckVqWH9ecXZTQmVbV0Z/"
);

const Editor3 = () => {
	let container = useRef(null);
	const [trackChangesEnabled, setTrackChangesEnabled] = useState(true);

	function handleDocSave() {
		if (container.current) {
			container.current.documentEditor.save("sample", "Docx");
		}
	}

	function handleDocExport() {
		if (container.current) {
			container.current.documentEditor.save("sample", "Docx");
		}
	}

	function handleRephrase() {
		// Check if there is a selection and replace it with "Hello"
		if (
			container.current &&
			container.current.documentEditor &&
			!container.current.documentEditor.selection.isEmpty
		) {
			container.current.documentEditor.editor.insertText("Hello");
		}
	}

	function onCreate() {
		if (container.current && container.current.documentEditor) {
			// Enable track changes when document is created
			container.current.documentEditor.enableTrackChanges = true;
			container.current.documentEditor.showRevisions = true;

			// Enable or disable track changes based on user toggle
			container.current.documentEditor.trackChanges = trackChangesEnabled;
		}
	}

	function toggleTrackChanges() {
		setTrackChangesEnabled(!trackChangesEnabled);
		if (container.current) {
			container.current.documentEditor.trackChanges = !trackChangesEnabled;
		}
	}

	// Fetch tracked changes data
	function fetchTrackedChanges() {
		if (container.current) {
			const revisions = container.current.documentEditor.revisions;

			console.log("revisions_Changes", revisions);

			let revisionData = [];

			for (let i = 0; i < revisions.length; i++) {
				const revision = revisions[i];
				revisionData.push({
					author: revision.author,
					type: revision.revisionType, // Insert/Delete
					date: revision.date,
					text: revision.range.text,
				});
			}
			console.log("Tracked Changes Data: ", revisionData);
		}
	}

	const customToolbarItems = [
		"New",
		"Open",
		"Separator",
		"Undo",
		"Redo",
		"Separator",
		"Image",
		"Table",
		"Hyperlink",
		"Bookmark",
		"TableOfContents",
		"Separator",
		"Header",
		"Footer",
		"PageSetup",
		"PageNumber",
		"Break",
		"InsertEndnote",
		"InsertFootnote",
		"Separator",
		"Find",
		"Comments",
		"TrackChanges",
		"LocalClipboard",
		"RestrictEditing",
		"FormFields",
		"UpdateFields",
		"ContentControl",
		"Separator",
		{
			prefixIcon: "e-icons e-de-ctnr-find", // Custom icon (can be from Syncfusion or custom CSS)
			text: "Download", // Custom button text
			tooltipText: "Download DOCX file to your local", // Tooltip
			id: "downloaddoc_button", // Button ID
			click: handleDocExport, // Function to handle click
			cssClass: "buttoncss",
		},
		{
			prefixIcon: "e-icons e-de-ctnr-find", // Custom icon for Track Changes
			text: trackChangesEnabled
				? "Disable Track Changes"
				: "Enable Track Changes", // Button to toggle track changes
			tooltipText: "Toggle Track Changes", // Tooltip
			click: toggleTrackChanges, // Function to toggle track changes
			cssClass: "buttoncss",
		},
		{
			prefixIcon: "e-icons e-de-ctnr-find", // Custom icon for showing changes
			text: "Show Tracked Changes", // Button to fetch tracked changes
			tooltipText: "Show Tracked Changes", // Tooltip
			click: fetchTrackedChanges, // Function to fetch tracked changes
			cssClass: "buttoncss",
		},
	];

	return (
		<>
			<div className="overflow-y-auto">
				<DocumentEditorContainerComponent
					id="container"
					ref={container}
					height={"850px"}
					serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
					enableToolbar={true}
					created={onCreate} // Ensure the `onCreate` is correctly called
					toolbarItems={customToolbarItems}
					enableTrackChanges={true}
				/>
			</div>
		</>
	);
};

export default Editor3;
