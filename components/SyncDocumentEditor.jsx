"use client";

import React, { useRef } from "react";
import {
	Toolbar,
	DocumentEditorComponent,
	Print,
	SfdtExport,
	WordExport,
	TextExport,
	Selection,
	Search,
	Editor,
	ImageResizer,
	EditorHistory,
	ContextMenu,
	OptionsPane,
	HyperlinkDialog,
	TableDialog,
	BookmarkDialog,
	TableOfContentsDialog,
	PageSetupDialog,
	StyleDialog,
	ListDialog,
	ParagraphDialog,
	BulletsAndNumberingDialog,
	FontDialog,
	TablePropertiesDialog,
	BordersAndShadingDialog,
	TableOptionsDialog,
	CellOptionsDialog,
	StylesDialog,
} from "@syncfusion/ej2-react-documenteditor";
import "@syncfusion/ej2-react-documenteditor/styles/material.css";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
	"Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3RXxbf1x0ZFRMYlpbR3VPMyBoS35RckVqWH9ecXZTQmVbV0Z/"
);

DocumentEditorComponent.Inject(
	Print,
	SfdtExport,
	WordExport,
	TextExport,
	Selection,
	Search,
	Editor,
	ImageResizer,
	EditorHistory,
	ContextMenu,
	OptionsPane,
	HyperlinkDialog,
	TableDialog,
	BookmarkDialog,
	TableOfContentsDialog,
	PageSetupDialog,
	StyleDialog,
	ListDialog,
	ParagraphDialog,
	BulletsAndNumberingDialog,
	FontDialog,
	TablePropertiesDialog,
	BordersAndShadingDialog,
	TableOptionsDialog,
	CellOptionsDialog,
	StylesDialog
);

const SyncDocumentEditor = () => {
	const documentEditorRef = useRef(null);

	const loadDocument = async () => {
		const response = await fetch("Copilot_PRD.docx"); // Provide the path to your DOCX file here
		const buffer = await response.arrayBuffer();
		documentEditorRef.current.documentEditor.open(buffer);
	};

	return (
		<div>
			<h2>Syncfusion Document Editor in React</h2>
			{/* <DocumentEditorContainerComponent
				id="DocumentEditorContainer"
				ref={documentEditorRef}
				height="590px"
				serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
				enableToolbar={true}
				enableLocalPaste={true}
			/> */}
			{/* <DocumentEditorContainerComponent
				id="container"
				style={{ height: "590px" }}
				serviceUrl="https://services.syncfusion.com/vue/production/api/documenteditor/"
				enableToolbar={true}
			/> */}
			<DocumentEditorComponent
				id="container"
				height={"330px"}
				serviceUrl="https://services.syncfusion.com/vue/production/api/documenteditor/"
				isReadOnly={false}
				enablePrint={true}
				enableSelection={true}
				enableEditor={true}
				enableEditorHistory={true}
				enableContextMenu={true}
				enableSearch={true}
				enableOptionsPane={true}
				enableBookmarkDialog={true}
				enableBordersAndShadingDialog={true}
				enableFontDialog={true}
				enableTableDialog={true}
				enableParagraphDialog={true}
				enableHyperlinkDialog={true}
				enableImageResizer={true}
				enableListDialog={true}
				enablePageSetupDialog={true}
				enableSfdtExport={true}
				enableStyleDialog={true}
				enableTableOfContentsDialog={true}
				enableTableOptionsDialog={true}
				enableTablePropertiesDialog={true}
				enableTextExport={true}
				enableWordExport={true}
			/>
			<button onClick={loadDocument}>Load Document</button>
		</div>
	);
};

export default SyncDocumentEditor;
