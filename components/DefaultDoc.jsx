import React, { useEffect } from "react";
import { defaultJson } from "../contents/default_doc";
import {
	DocumentEditorContainerComponent,
	Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
DocumentEditorContainerComponent.Inject(Toolbar);

registerLicense(
	"Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3RXxbf1x0ZFRMYlpbR3VPMyBoS35RckVqWH9ecXZTQmVbV0Z/"
);

const DefaultDoc = () => {
	let documenteditorcontainer;

	useEffect(() => {
		componentDidMount();
	}, []);

	function created() {
		// load your default document here
		let data = defaultJson; // Open the default document
		documenteditorcontainer.documentEditor.open(data);
	}

	function componentDidMount() {
		setTimeout(() => {
			created();
		});
	}

	return (
		<div>
			<div>
				<DocumentEditorContainerComponent
					height={"850px"}
					id="container"
					ref={(scope) => {
						documenteditorcontainer = scope;
						created();
					}}
					serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
					enableToolbar={true}
				/>
			</div>
		</div>
	);
};

export default DefaultDoc;
