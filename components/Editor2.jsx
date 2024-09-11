import React, { useRef } from "react";
import {
	DocumentEditorContainerComponent,
	Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
DocumentEditorContainerComponent.Inject(Toolbar);

registerLicense(
	"Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3RXxbf1x0ZFRMYlpbR3VPMyBoS35RckVqWH9ecXZTQmVbV0Z/"
);

const Editor2 = () => {
	let container = useRef(null);

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

	function enableTrackChanges() {
		if (container.current && container.current.documentEditor) {
			console.log("track", container.current.documentEditor.enableTrackChanges);

			container.current.documentEditor.enableTrackChanges = true;
			console.log(
				"track_after",
				container.current.documentEditor.enableTrackChanges
			);

			container.current.documentEditor.showRevisions = false;
			container.current.documentEditor.showComments = false;

			// container.current.documentEditor.trackChanges = true; // Enable tracking changes
		}
	}

	function handleRephrase() {
		// Check if there is a selection and replace it with "Hello"

		const start = container.current.documentEditor.selection.startOffset;
		const end = container.current.documentEditor.selection.endOffset;

		console.log("offset_startOffset", start);
		console.log("offset_endOffset", end);

		if (
			container.current &&
			container.current.documentEditor &&
			!container.current.documentEditor.selection.isEmpty
		) {
			container.current.documentEditor.editor.insertText("Hello");

			// setTimeout(() => {
			// 	container.current.documentEditor.editor.insertText("generating....");
			// }, 2000);
		}
	}

	function fetchTrackedChanges() {
		if (container.current) {
			const revisions = container.current.documentEditor.revisions;
			console.log("revisions_Changes", revisions);
			console.log("revision_get", revisions.get(0));

			// revisions.acceptAll();
			// revisions.rejectAll();

			// revisions.get(0).accept();
			// revisions.get(1).reject();

			revisions.changes.forEach((revision) => {
				console.log("each_revision", revision);
				console.log("Revision Type:", revision.revisionType); // Insert/Delete
				console.log("Author:", revision.author); // Author of the revision
				console.log("Date:", revision.date);
				console.log("Revision Text:", revision.range[0].text); // Text associated with the revision
			});
		}
	}

	// Extracted function for handling context menu select logic
	function handleContextMenuSelect(args) {
		let id = container.current.documentEditor.element.id;

		switch (args.id) {
			case id + "search_in_google":
				let searchContent = container.current.documentEditor.selection.text;
				if (
					!container.current.documentEditor.selection.isEmpty &&
					/\S/.test(searchContent)
				) {
					console.log("Selected text:", searchContent);
					window.open("http://google.com/search?q=" + searchContent);
				}
				break;
			case id + "rephrase":
				// Call the rephrase function to replace the selected text
				handleRephrase();
				break;
		}
	}

	// Extracted function for context menu before opening
	function handleContextMenuBeforeOpen(args) {
		let search = document.getElementById(args.ids[0]);
		search.style.display = "none";
		let searchContent = container.current.documentEditor.selection.text;
		if (
			!container.current.documentEditor.selection.isEmpty &&
			/\S/.test(searchContent)
		) {
			search.style.display = "block";
		}
	}

	// function approveAllChanges() {
	// 	const revisions = container.current.documentEditor.revisions;
	// 	revisions.forEach((revision) => {
	// 		revision.accept();
	// 	});
	// 	console.log("All changes approved");
	// }

	// function rejectAllChanges() {
	// 	const revisions = container.current.documentEditor.revisions;
	// 	revisions.forEach((revision) => {
	// 		revision.reject();
	// 	});
	// 	console.log("All changes rejected");
	// }

	function onCreate() {
		if (container.current && container.current.documentEditor) {
			container.current.documentEditor.enableTrackChanges = true;
			container.current.documentEditor.showRevisions = false;
			container.current.documentEditor.showComments = false;

			// creating Custom Options
			let menuItems = [
				{
					text: "Search In Google",
					id: "search_in_google",
					iconCss: "e-icons e-de-ctnr-find",
				},
				{
					text: "Rephrase",
					id: "rephrase",
					iconCss: "e-icons e-de-ctnr-find",
				},
			];

			// adding Custom Options
			container.current.documentEditor.contextMenu.addCustomMenu(
				menuItems,
				false
			);

			// Use the extracted functions here
			container.current.documentEditor.customContextMenuSelect =
				handleContextMenuSelect;
			container.current.documentEditor.customContextMenuBeforeOpen =
				handleContextMenuBeforeOpen;
		}
	}

	function onDocumentLoaded() {
		setTimeout(() => {
			enableTrackChanges(); // Ensure track changes are re-enabled after loading a document
		}, 100);
	}

	function showDialog() {
		//⚠️ Uncomment the dialog you want to show - one at a time ONLY ⚠️

		container.current.documentEditor.showDialog("Font");
		// container.current.documentEditor.showDialog("Paragraph");
		// container.current.documentEditor.showDialog("Table");
		// container.current.documentEditor.showDialog("Hyperlink");
		// container.current.documentEditor.showDialog("Bookmark");
		// container.current.documentEditor.showDialog("TableOfContents");
		// container.current.documentEditor.showDialog("Style");
		// container.current.documentEditor.showDialog("List");
		// container.current.documentEditor.showDialog("BordersAndShading");
		// container.current.documentEditor.showDialog("TableOptions");
		// container.current.documentEditor.showDialog("TableProperties");
		// container.current.documentEditor.showDialog("PageSetup");
	}

	const showTrackedChangesButton = {
		prefixIcon: "e-icons e-de-ctnr-find",
		text: "Show Tracked Changes",
		tooltipText: "Show Tracked Changes",
		id: "showtracked_button",
		click: fetchTrackedChanges,
		// cssClass: "buttoncss",
	};

	const showDownloadButton = {
		prefixIcon: "e-icons e-de-ctnr-find",
		text: "Download",
		tooltipText: "Download DOCX file to your local",
		id: "downloaddoc_button",
		click: handleDocExport,
		// cssClass: "buttoncss",
	};

	const openDialogButton = {
		prefixIcon: "e-icons e-de-ctnr-find",
		text: "Open Dialog",
		tooltipText: "Open any custom dialog here",
		id: "opendialog_button",
		click: showDialog,
		// cssClass: "buttoncss",
	};

	const customToolbarItems = [
		"New",
		"Open",
		"TrackChanges",
		showTrackedChangesButton,
		showDownloadButton,
		openDialogButton,
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
		"LocalClipboard",
		"RestrictEditing",
		"FormFields",
		"UpdateFields",
		"ContentControl",
		"Separator",
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
					created={onCreate}
					documentChange={onDocumentLoaded}
					toolbarItems={customToolbarItems}
					enableTrackChanges={true}
					enableFontDialog={true}
					enableParagraphDialog={true}
					enableTableDialog={true}
					enableBookmarkDialog={true}
					enableHyperlinkDialog={true}
					enableTableOfContentsDialog={true}
					enableStyleDialog={true}
					enableListDialog={true}
					enableBordersAndShadingDialog={true}
					enableTableOptionsDialog={true}
					enableTablePropertiesDialog={true}
					enablePageSetupDialog={true}
				/>
			</div>
		</>
	);
};

export default Editor2;
