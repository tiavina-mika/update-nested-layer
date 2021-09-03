/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import ReactJson from "react-json-view";

// ------------------------------- //
// ------------ template --------- //
// ------------------------------- //
const template = {
  name: "template1",
  layers: [
    {
      id: "m1",
      type: "mask",
      layers: [
        { id: "ui1", type: "userImage", file: { file: "/ui1.jpg" } },
        { id: "ui11", type: "userImage", file: { file: "/ui11.jpg" } },
        { id: "ut1", type: "userText" }
        // { id: "i1", type: "image" }
      ]
    },
    // { id: "ut2", type: "userText" },
    { id: "i2", type: "image" },
    { id: "ui12", type: "userImage", file: { file: "/ui12.jpg" } }
  ]
};

const classes = {
  reactJson: {
    width: "100%",
    padding: 20
  }
};

const selectedLayer = {
  id: "ui11",
  type: "userImage",
  file: { file: "/ui11.jpg" }
};
const newFile = { file: "/anomalie.jpeg" };

const updateSelectedTemplate = ({ selectedTemplate, selectedLayer, file }) => {
  const template = { ...selectedTemplate };

  let newTemplateLayers = [];
  for (const layer of template.layers) {
    const newLayers = [];

    if (layer.type === "mask") {
      const newSubLayers = [];
      for (const subLayer of layer.layers) {
        if (subLayer.id === selectedLayer.id) {
          newSubLayers.push({ ...selectedLayer, file });
        } else {
          newSubLayers.push(subLayer);
        }
      }
      newLayers.push({ ...layer, layers: newSubLayers });
    } else {
      if (layer.id === selectedLayer.id) {
        newLayers.push({ ...selectedLayer, file });
      } else {
        newLayers.push(layer);
      }
    }
    newTemplateLayers.push(newLayers);
  }

  return { ...template, layers: newTemplateLayers.flat() };
};

// --------------------------- //
// -------- component -------- //
// --------------------------- //
const Test = () => {
  return (
    <div className="flexCenter">
      <ReactJson
        src={updateSelectedTemplate({
          selectedLayer,
          file: newFile,
          selectedTemplate: template
        })}
        theme="pop"
        displayDataTypes={false}
        style={classes.reactJson}
        displayArrayKey={false}
        displayObjectSize={false}
      />
    </div>
  );
};

export default Test;
