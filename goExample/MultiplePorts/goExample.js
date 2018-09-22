// // go.js  案例
require("../lib/js/go-debug.js");
// var $go = go.GraphObject.make;
// var myDiagram =
//     $go(go.Diagram, "myDiagramDiv", { // 绑定DOM元素
//         "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
//     });

// // define a TreeLayout that flows from top to bottom
// myDiagram.layout =
//     $go(go.TreeLayout, {
//         angle: 90, // 树形布局排列方式，从左到右，从上到下，从右到左，从下到上 分别为 0，90，180，270
//         layerSpacing: 40 // 每层间距 px
//     });

// // define a simple Node template
// myDiagram.nodeTemplate =
//     $go(go.Node, "Horizontal", //定义node的放置方式 水平、垂直 Horizontal Vertical
//         // the entire node will have a light-blue background
//         {
//             background: "#44CCFF"
//         },
//         $go(go.Picture, // 图片的节点
//             // Pictures should normally have an explicit width and height.
//             // This picture has a red background, only visible when there is no source set
//             // or when the image is partially transparent.
//             {
//                 margin: 10,
//                 width: 50,
//                 height: 50,
//                 background: "red"
//             },
//             // Picture.source is data bound to the "source" attribute of the model data
//             new go.Binding("source")),
//         // 绑定并数据  等同于 new go.Binding("source","picName")) 第一个参数是go.Picture图片节点的属性相当于(href,picAddr) , 如果该属性名和model.nodeDataArray中的属性名相同，则省略第二个参数 
//         $go(go.TextBlock,
//             "Default Text", // the initial value for TextBlock.text 
//             // some room around the text, a larger font, and a white stroke:
//             {
//                 margin: 12,
//                 stroke: "white",
//                 font: "bold 16px sans-serif"
//             },
//             // TextBlock.text is data bound to the "name" attribute of the model data
//             new go.Binding("text", "name"))
//     );

// // define a Link template that routes orthogonally, with no arrowhead
// myDiagram.linkTemplate =
//     $go(go.Link,
//         // default routing is go.Link.Normal
//         // default corner is 0
//         {
//             routing: go.Link.Orthogonal, // 指定路线为直角类型
//             corner: 5   // 圆角度为 5
//         },
//         $go(go.Shape, {
//             strokeWidth: 3,  
//             stroke: "#555"
//         }), // the link shape

//         // if we wanted an arrowhead we would also add another Shape with toArrow defined:
//         $go(go.Shape, { toArrow: "Standard", stroke: "red" })  // 指定箭头样式  
//     );

// // var model = $go(go.GraphLinksModel);  // 支持链接关系，为每个链接使用单独的链路数据对象
// var model = $go(go.TreeModel);  // 只支持形成树形结构图的链接关系
// model.nodeDataArray = [ // note that each node data object holds whatever properties it needs;
//     // for this app we add the "name" and "source" properties
//     {
//         key: "1",
//         name: "Don Meow",
//         source: "../src/image/cat1.png"
//     },
//     {
//         key: "2",
//         parent: "1",
//         name: "Demeter",
//         source: "../src/image/cat2.png"
//     },
//     {
//         key: "3",
//         parent: "1",
//         name: "Copricat",
//         source: "../src/image/cat3.png"
//     },
//     {
//         key: "4",
//         parent: "3",
//         name: "Jellylorum",
//         source: "../src/image/cat4.png"
//     },
//     {
//         key: "5",
//         parent: "3",
//         name: "Alonzo",
//         source: "../src/image/cat5.png"
//     },
//     {
//         key: "6",
//         parent: "2",
//         name: "Munkustrap",
//         source: "../src/image/cat6.png"
//     }
// ];
// myDiagram.model = model;


/* palette */

// var myDiagram;
// var myPalette;
// function init() {
//     if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
//     var $go = go.GraphObject.make; // for conciseness in defining templates

//     myDiagram =
//         $go(go.Diagram, "myDiagramDiv", // must name or refer to the DIV HTML element
//             {
//                 initialContentAlignment: go.Spot.Center,  
//                 allowDrop: true, // must be true to accept drops from the Palette
//                 "LinkDrawn": showLinkLabel, // this DiagramEvent listener is defined below
//                 "LinkRelinked": showLinkLabel,
//                 scrollsPageOnFocus: false,
//                 "undoManager.isEnabled": true // enable undo & redo
//             });

//     // when the document is modified, add a "*" to the title and enable the "Save" button
//     // myDiagram.addDiagramListener("Modified", function (e) {
//     //     var button = document.getElementById("SaveButton");
//     //     if (button) button.disabled = !myDiagram.isModified;
//     //     var idx = document.title.indexOf("*");
//     //     if (myDiagram.isModified) {
//     //         if (idx < 0) document.title += "*";
//     //     } else {
//     //         if (idx >= 0) document.title = document.title.substr(0, idx);
//     //     }
//     // });

//     // helper definitions for node templates
//     function nodeStyle() {
//         return [
//             // The Node.location comes from the "loc" property of the node data,
//             // converted by the Point.parse static method.
//             // If the Node.location is changed, it updates the "loc" property of the node data,
//             // converting back using the Point.stringify static method.
//             new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
//             {
//                 // the Node.location is at the center of each node
//                 locationSpot: go.Spot.Center
//             }
//         ];
//     }

//     // Define a function for creating a "port" that is normally transparent.
//     // The "name" is used as the GraphObject.portId,
//     // the "align" is used to determine where to position the port relative to the body of the node,
//     // the "spot" is used to control how links connect with the port and whether the port
//     // stretches along the side of the node,
//     // and the boolean "output" and "input" arguments control whether the user can draw links from or to the port.
//     function makePort(name, align, spot, output, input) {
//         var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
//         // the port is basically just a transparent rectangle that stretches along the side of the node,
//         // and becomes colored when the mouse passes over it
//         return $go(go.Shape, {
//             fill: "transparent", // changed to a color in the mouseEnter event handler
//             strokeWidth: 0, // no stroke
//             width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
//             height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
//             alignment: align, // align the port on the main Shape
//             stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
//             portId: name, // declare this object to be a "port"
//             fromSpot: spot, // declare where links may connect at this port
//             fromLinkable: output, // declare whether the user may draw links from here   是否可以在此处获取链接
//             toSpot: spot, // declare where links may connect at this port
//             toLinkable: input, // declare whether the user may draw links to here  是否可以链接到此处
//             cursor: "pointer", // show a different cursor to indicate potential link point
//             mouseEnter: function (e, port) { // the PORT argument will be this Shape
//                 if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
//             },
//             mouseLeave: function (e, port) {
//                 port.fill = "transparent";
//             }
//         });
//     }

//     function textStyle() {
//         return {
//             font: "bold 11pt Helvetica, Arial, sans-serif",
//             stroke: "whitesmoke"
//         }
//     }

//     // define the Node templates for regular nodes

//     myDiagram.nodeTemplateMap.add("", // the default category
//         $go(go.Node, "Table", nodeStyle(),
//             // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
//             $go(go.Panel, "Auto",
//                 $go(go.Shape, "Rectangle", { // 长方形
//                         fill: "#00A9C9",
//                         strokeWidth: 0
//                     },
//                     new go.Binding("figure", "figure")),
//                 $go(go.TextBlock, textStyle(), {
//                         margin: 8,
//                         maxSize: new go.Size(160, NaN),
//                         wrap: go.TextBlock.WrapFit,
//                         // editable: true   // 图表可编辑
//                     },
//                     new go.Binding("text").makeTwoWay())
//             ),
//             // four named ports, one on each side:
//             // makePort(name, align, spot, output, input)
//             makePort("T", go.Spot.Top, go.Spot.TopSide, false, true), // 可以从此端点出（top），但是从此端点出去的链接不可以连top端点
//             makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
//             makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
//             makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)  // 不可从此端点进
//         ));

//     myDiagram.nodeTemplateMap.add("Conditional",  // 条件/判断
//         $go(go.Node, "Table", nodeStyle(),
//             // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
//             $go(go.Panel, "Auto",
//                 $go(go.Shape, "Diamond", { // 菱形
//                         fill: "#00A9C9",
//                         strokeWidth: 0
//                     },
//                     new go.Binding("figure", "figure")),
//                 $go(go.TextBlock, textStyle(), {
//                         margin: 8,
//                         maxSize: new go.Size(160, NaN),
//                         wrap: go.TextBlock.WrapFit,
//                         editable: true
//                     },
//                     new go.Binding("text").makeTwoWay())
//             ),
//             // four named ports, one on each side:
//             makePort("T", go.Spot.Top, go.Spot.Top, false, true),
//             makePort("L", go.Spot.Left, go.Spot.Left, true, true),
//             makePort("R", go.Spot.Right, go.Spot.Right, true, true),
//             makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
//         ));

//     myDiagram.nodeTemplateMap.add("Start",
//         $go(go.Node, "Table", nodeStyle(),
//             $go(go.Panel, "Auto",
//                 $go(go.Shape, "Circle", {
//                     minSize: new go.Size(40, 40),
//                     fill: "#79C900",
//                     strokeWidth: 0
//                 }),
//                 $go(go.TextBlock, "Start", textStyle(),
//                     new go.Binding("text"))
//             ),
//             // three named ports, one on each side except the top, all output only:
//             makePort("L", go.Spot.Left, go.Spot.Left, true, false),
//             makePort("R", go.Spot.Right, go.Spot.Right, true, false),
//             makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
//         ));

//     myDiagram.nodeTemplateMap.add("End",
//         $go(go.Node, "Table", nodeStyle(),
//             $go(go.Panel, "Auto",
//                 $go(go.Shape, "Circle", {
//                     minSize: new go.Size(40, 40),
//                     fill: "#DC3C00",
//                     strokeWidth: 0
//                 }),
//                 $go(go.TextBlock, "End", textStyle(),
//                     new go.Binding("text"))
//             ),
//             // three named ports, one on each side except the bottom, all input only:
//             // output/input  箭头类型，表示是否可以链接/被链接
//             makePort("T", go.Spot.Top, go.Spot.Top, false, true),
//             makePort("L", go.Spot.Left, go.Spot.Left, false, true),
//             makePort("R", go.Spot.Right, go.Spot.Right, false, true)
//         ));

//     myDiagram.nodeTemplateMap.add("Comment",   // 注释
//         $go(go.Node, "Auto", nodeStyle(),
//             $go(go.Shape, "File", {   // 模型： 文件
//                 fill: "#EFFAB4",
//                 strokeWidth: 0
//             }),
//             $go(go.TextBlock, textStyle(), {
//                     margin: 5,
//                     maxSize: new go.Size(200, NaN),
//                     wrap: go.TextBlock.WrapFit,
//                     textAlign: "center",
//                     editable: true,
//                     font: "bold 12pt Helvetica, Arial, sans-serif",
//                     stroke: '#454545'
//                 },
//                 new go.Binding("text").makeTwoWay())
//             // no ports, because no links are allowed to connect with a comment
//         ));


//     // replace the default Link template in the linkTemplateMap
//     myDiagram.linkTemplate =
//         $go(go.Link, // the whole link panel
//             {
//                 routing: go.Link.AvoidsNodes,
//                 curve: go.Link.JumpOver,
//                 corner: 5,
//                 toShortLength: 4,
//                 relinkableFrom: true,
//                 relinkableTo: true,
//                 reshapable: true,
//                 resegmentable: true,
//                 // mouse-overs subtly highlight links:
//                 mouseEnter: function (e, link) {
//                     link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
//                 },
//                 mouseLeave: function (e, link) {
//                     link.findObject("HIGHLIGHT").stroke = "transparent";
//                 }
//             },
//             new go.Binding("points").makeTwoWay(),
//             $go(go.Shape, // the highlight shape, normally transparent   高亮
//                 {
//                     isPanelMain: true,
//                     strokeWidth: 8,
//                     stroke: "transparent",
//                     name: "HIGHLIGHT"
//                 }),
//             $go(go.Shape, // the link path shape
//                 {
//                     isPanelMain: true,
//                     stroke: "gray",
//                     strokeWidth: 2
//                 }),
//             $go(go.Shape, // the arrowhead  箭头
//                 {
//                     toArrow: "standard",
//                     strokeWidth: 0,
//                     fill: "gray"
//                 }),
//             $go(go.Panel, "Auto", // the link label, normally not visible
//                 {
//                     visible: false,
//                     name: "LABEL",
//                     segmentIndex: 2,
//                     segmentFraction: 0.5
//                 },
//                 new go.Binding("visible", "visible").makeTwoWay(),
//                 $go(go.Shape, "RoundedRectangle", // the label shape
//                     {
//                         fill: "#F8F8F8",
//                         strokeWidth: 0
//                     }),
//                 $go(go.TextBlock, "Yes", // the label
//                     {
//                         textAlign: "center",
//                         font: "10pt helvetica, arial, sans-serif",
//                         stroke: "#333333",
//                         editable: true
//                     },
//                     new go.Binding("text").makeTwoWay())
//             )
//         );

//     // Make link labels visible if coming out of a "conditional" node.
//     // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
//     function showLinkLabel(e) {
//         var label = e.subject.findObject("LABEL");
//         if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
//     }

//     // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
//     myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
//     myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

//     load(); // load an initial diagram from some JSON text

//     // initialize the Palette that is on the left side of the page 侧边栏
//     myPalette =
//         $go(go.Palette, "myPaletteDiv", // must name or refer to the DIV HTML element
//             {
//                 scrollsPageOnFocus: false,
//                 nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
//                 model: new go.GraphLinksModel([ // specify the contents of the Palette
//                     {
//                         category: "Start",
//                         text: "Start"
//                     },
//                     {
//                         text: "Step"
//                     },
//                     {
//                         category: "Conditional",
//                         text: "???"
//                     },
//                     {
//                         category: "End",
//                         text: "End"
//                     },
//                     {
//                         category: "Comment",
//                         text: "Comment"
//                     }
//                 ])
//             });
// } // end init

// init();
// // Show the diagram's model in JSON format that the user may edit
// function save() {
//     document.getElementById("mySavedModel").value = myDiagram.model.toJson();
//     myDiagram.isModified = false;
// }

// function load() {
//     myDiagram.model = go.Model.fromJson({
//         "class": "go.GraphLinksModel",
//         "linkFromPortIdProperty": "fromPort",
//         "linkToPortIdProperty": "toPort",
//          "nodeDataArray": [
//         //{
//         //         "category": "Comment",
//         //         "loc": "360 -10",
//         //         "text": "Kookie Brittle",
//         //         "key": -13
//         //     },
//         //     {
//         //         "key": -1,
//         //         "category": "Start",
//         //         "loc": "175 0",
//         //         "text": "Start"
//         //     },
//         //     {
//         //         "key": 0,
//         //         "loc": "-5 75",
//         //         "text": "Preheat oven to 375 F"
//         //     },
//         //     {
//         //         "key": 1,
//         //         "loc": "175 100",
//         //         "text": "In a bowl, blend: 1 cup margarine, 1.5 teaspoon vanilla, 1 teaspoon salt"
//         //     },
//         //     {
//         //         "key": 2,
//         //         "loc": "175 200",
//         //         "text": "Gradually beat in 1 cup sugar and 2 cups sifted flour"
//         //     },
//         //     {
//         //         "key": 3,
//         //         "loc": "175 290",
//         //         "text": "Mix in 6 oz (1 cup) Nestle's Semi-Sweet Chocolate Morsels"
//         //     },
//         //     {
//         //         "key": 4,
//         //         "loc": "175 380",
//         //         "text": "Press evenly into ungreased 15x10x1 pan"
//         //     },
//         //     {
//         //         "key": 5,
//         //         "loc": "355 85",
//         //         "text": "Finely chop 1/2 cup of your choice of nuts"
//         //     },
//         //     {
//         //         "key": 6,
//         //         "loc": "175 450",
//         //         "text": "Sprinkle nuts on top"
//         //     },
//         //     {
//         //         "key": 7,
//         //         "loc": "175 515",
//         //         "text": "Bake for 25 minutes and let cool"
//         //     },
//         //     {
//         //         "key": 8,
//         //         "loc": "175 585",
//         //         "text": "Cut into rectangular grid"
//         //     },
//         //     {
//         //         "key": -2,
//         //         "category": "End",
//         //         "loc": "175 660",
//         //         "text": "Enjoy!"
//         //     }
//         ],
//         "linkDataArray": [
//             // {
//             //     "from": 1,
//             //     "to": 2,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 2,
//             //     "to": 3,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 3,
//             //     "to": 4,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 4,
//             //     "to": 6,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 6,
//             //     "to": 7,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 7,
//             //     "to": 8,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 8,
//             //     "to": -2,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": -1,
//             //     "to": 0,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": -1,
//             //     "to": 1,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": -1,
//             //     "to": 5,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 5,
//             //     "to": 4,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // },
//             // {
//             //     "from": 0,
//             //     "to": 4,
//             //     "fromPort": "B",
//             //     "toPort": "T"
//             // }
//         ]
//     });

//     // console.log(document.getElementById("mySavedModel").value);
// }

// // print the diagram by opening a new window holding SVG images of the diagram contents for each page
// // function printDiagram() {
// //     var svgWindow = window.open();
// //     if (!svgWindow) return; // failure to open a new Window
// //     var printSize = new go.Size(700, 960);
// //     var bnds = myDiagram.documentBounds;
// //     var x = bnds.x;
// //     var y = bnds.y;
// //     while (y < bnds.bottom) {
// //         while (x < bnds.right) {
// //             var svg = myDiagram.makeSVG({
// //                 scale: 1.0,
// //                 position: new go.Point(x, y),
// //                 size: printSize
// //             });
// //             svgWindow.document.body.appendChild(svg);
// //             x += printSize.width;
// //         }
// //         x = bnds.x;
// //         y += printSize.height;
// //     }
// //     setTimeout(function () {
// //         svgWindow.print();
// //     }, 1);
// // }


/* Multiple ports */

var myDiagram;

function init() {
    // if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; //for conciseness in defining node templates

    myDiagram =
        $(go.Diagram, "myDiagramDiv", // Diagram refers to its DIV HTML element by id
            {
                initialContentAlignment: go.Spot.Center,
                "undoManager.isEnabled": true
            });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    // myDiagram.addDiagramListener("Modified", function (e) {
    //     var button = document.getElementById("SaveButton");
    //     if (button) button.disabled = !myDiagram.isModified;
    //     var idx = document.title.indexOf("*");
    //     if (myDiagram.isModified) {
    //         if (idx < 0) document.title += "*";
    //     } else {
    //         if (idx >= 0) document.title = document.title.substr(0, idx);
    //     }
    // });

    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
        return $("ContextMenuButton",
            $(go.TextBlock, text), {
                click: action
            },
            // don't bother with binding GraphObject.visible if there's no predicate
            visiblePredicate ? new go.Binding("visible", "", function (o, e) {
                return o.diagram ? visiblePredicate(o, e) : false;
            }).ofObject() : {});
    }

    var nodeMenu = // context menu for each Node
        $(go.Adornment, "Vertical"
            // makeButton("Copy",
            //     function (e, obj) {
            //         e.diagram.commandHandler.copySelection();
            //     }),
            // makeButton("Delete",
            //     function (e, obj) {
            //         e.diagram.commandHandler.deleteSelection();
            //     }),
            // $(go.Shape, "LineH", {
            //     strokeWidth: 2,
            //     height: 1,
            //     stretch: go.GraphObject.Horizontal
            // }),
            // makeButton("Add top port",
            //     function (e, obj) {
            //         addPort("top");
            //     }),
            // makeButton("Add left port",
            //     function (e, obj) {
            //         addPort("left");
            //     }),
            // makeButton("Add right port",
            //     function (e, obj) {
            //         addPort("right");
            //     }),
            // makeButton("Add bottom port",
            //     function (e, obj) {
            //         addPort("bottom");
            //     })
        );

    var portSize = new go.Size(8, 8);

    var portMenu = // context menu for each port
        $(go.Adornment, "Vertical"
            // makeButton("Swap order",
            //     function (e, obj) {
            //         swapOrder(obj.part.adornedObject);
            //     }),
            // makeButton("Remove port",
            //     // in the click event handler, the obj.part is the Adornment;
            //     // its adornedObject is the port
            //     function (e, obj) {
            //         removePort(obj.part.adornedObject);
            //     }),
            // makeButton("Change color",
            //     function (e, obj) {
            //         changeColor(obj.part.adornedObject);
            //     }),
            // makeButton("Remove side ports",
            //     function (e, obj) {
            //         removeAll(obj.part.adornedObject);
            //     })
        );

    // the node template
    // includes a panel on each side with an itemArray of panels containing ports
    myDiagram.nodeTemplate =
        $(go.Node, "Table", {
                locationObjectName: "BODY",
                locationSpot: go.Spot.Center,
                selectionObjectName: "BODY",
                contextMenu: nodeMenu
            },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),

            // the body
            $(go.Panel, "Auto", {
                    row: 1,
                    column: 1,
                    name: "BODY",
                    stretch: go.GraphObject.Fill
                },
                $(go.Shape, "Rectangle", {
                    fill: "#AC193D",
                    stroke: null,
                    strokeWidth: 0,
                    minSize: new go.Size(56, 56)
                }),
                $(go.TextBlock, {
                        margin: 10,
                        textAlign: "center",
                        font: "14px  Segoe UI,sans-serif",
                        stroke: "white",
                        editable: true
                    },
                    new go.Binding("text", "name").makeTwoWay())
            ), // end Auto Panel body

            // the Panel holding the left port elements, which are themselves Panels,
            // created for each item in the itemArray, bound to data.leftArray
            $(go.Panel, "Vertical",
                new go.Binding("itemArray", "leftArray"), {
                    row: 1,
                    column: 0,
                    itemTemplate: $(go.Panel, {
                            _side: "left", // internal property to make it easier to tell which side it's on
                            fromSpot: go.Spot.Left,
                            toSpot: go.Spot.Left,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: portMenu
                        },
                        new go.Binding("portId", "portId"),
                        $(go.Shape, "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0)
                            },
                            new go.Binding("fill", "portColor"))
                    ) // end itemTemplate
                }
            ), // end Vertical Panel

            // the Panel holding the top port elements, which are themselves Panels,
            // created for each item in the itemArray, bound to data.topArray
            $(go.Panel, "Horizontal",
                new go.Binding("itemArray", "topArray"), {
                    row: 0,
                    column: 1,
                    itemTemplate: $(go.Panel, {
                            _side: "top",
                            fromSpot: go.Spot.Top,
                            toSpot: go.Spot.Top,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: portMenu
                        },
                        new go.Binding("portId", "portId"),
                        $(go.Shape, "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1)
                            },
                            new go.Binding("fill", "portColor"))
                    ) // end itemTemplate
                }
            ), // end Horizontal Panel

            // the Panel holding the right port elements, which are themselves Panels,
            // created for each item in the itemArray, bound to data.rightArray
            $(go.Panel, "Vertical",
                new go.Binding("itemArray", "rightArray"), {
                    row: 1,
                    column: 2,
                    itemTemplate: $(go.Panel, {
                            _side: "right",
                            fromSpot: go.Spot.Right,
                            toSpot: go.Spot.Right,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: portMenu
                        },
                        new go.Binding("portId", "portId"),
                        $(go.Shape, "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0)
                            },
                            new go.Binding("fill", "portColor"))
                    ) // end itemTemplate
                }
            ), // end Vertical Panel

            // the Panel holding the bottom port elements, which are themselves Panels,
            // created for each item in the itemArray, bound to data.bottomArray
            $(go.Panel, "Horizontal",
                new go.Binding("itemArray", "bottomArray"), {
                    row: 2,
                    column: 1,
                    itemTemplate: $(go.Panel, {
                            _side: "bottom",
                            fromSpot: go.Spot.Bottom,
                            toSpot: go.Spot.Bottom,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: portMenu
                        },
                        new go.Binding("portId", "portId"),
                        $(go.Shape, "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1)
                            },
                            new go.Binding("fill", "portColor"))
                    ) // end itemTemplate
                }
            ) // end Horizontal Panel
        ); // end Node

    // an orthogonal link template, reshapable and relinkable
    myDiagram.linkTemplate =
        // defined below
        $(go.Link, {
                routing: go.Link.AvoidsNodes,
                corner: 4,
                curve: go.Link.JumpGap,
                reshapable: true,
                resegmentable: true,
                relinkableFrom: true,
                relinkableTo: true
            },
            new go.Binding("points").makeTwoWay(),
            $(go.Shape, {
                stroke: "#2F4F4F",
                strokeWidth: 2
            })
        );

    // support double-clicking in the background to add a copy of this data as a node
    // myDiagram.toolManager.clickCreatingTool.archetypeNodeData = {
    //     name: "Unit",
    //     leftArray: [],
    //     rightArray: [],
    //     topArray: [],
    //     bottomArray: []
    // };

    // myDiagram.contextMenu =
    //     $(go.Adornment, "Vertical",
    //         makeButton("Paste",
    //             function (e, obj) {
    //                 e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint);
    //             },
    //             function (o) {
    //                 return o.diagram.commandHandler.canPasteSelection();
    //             }),
    //         makeButton("Undo",
    //             function (e, obj) {
    //                 e.diagram.commandHandler.undo();
    //             },
    //             function (o) {
    //                 return o.diagram.commandHandler.canUndo();
    //             }),
    //         makeButton("Redo",
    //             function (e, obj) {
    //                 e.diagram.commandHandler.redo();
    //             },
    //             function (o) {
    //                 return o.diagram.commandHandler.canRedo();
    //             })
    //     );

    // load the diagram from JSON data
    // load();

    myDiagram.model = go.Model.fromJson({
        "class": "go.GraphLinksModel",
        "copiesArrays": true,
        "copiesArrayObjects": true,
        "linkFromPortIdProperty": "fromPort",
        "linkToPortIdProperty": "toPort",
        "nodeDataArray": [{
                "key": 1,
                "name": "unit One",
                "loc": "101 204",
                "leftArray": [{
                    "portColor": "#425e5c",
                    "portId": "left0"
                }],
                "topArray": [{
                    "portColor": "#d488a2",
                    "portId": "top0"
                }],
                "bottomArray": [{
                    "portColor": "#316571",
                    "portId": "bottom0"
                }],
                "rightArray": [{
                    "portColor": "#923951",
                    "portId": "right0"
                }, {
                    "portColor": "#ef3768",
                    "portId": "right1"
                }]
            },
            {
                "key": 2,
                "name": "unit Two",
                "loc": "320 152",
                "leftArray": [{
                    "portColor": "#7d4bd6",
                    "portId": "left0"
                }, {
                    "portColor": "#cc585c",
                    "portId": "left1"
                }, {
                    "portColor": "#b1273a",
                    "portId": "left2"
                }],
                "topArray": [{
                    "portColor": "#14abef",
                    "portId": "top0"
                }],
                "bottomArray": [{
                    "portColor": "#dd45c7",
                    "portId": "bottom0"
                }, {
                    "portColor": "#995aa6",
                    "portId": "bottom1"
                }, {
                    "portColor": "#6b95cb",
                    "portId": "bottom2"
                }],
                "rightArray": []
            },
            {
                "key": 3,
                "name": "unit Three",
                "loc": "384 319",
                "leftArray": [{
                    "portColor": "#bd8f27",
                    "portId": "left0"
                }, {
                    "portColor": "#c14617",
                    "portId": "left1"
                }, {
                    "portColor": "#47fa60",
                    "portId": "left2"
                }],
                "topArray": [{
                    "portColor": "#d08154",
                    "portId": "top0"
                }],
                "bottomArray": [{
                    "portColor": "#6cafdb",
                    "portId": "bottom0"
                }],
                "rightArray": []
            },
            {
                "key": 4,
                "name": "unit Four",
                "loc": "138 351",
                "leftArray": [{
                    "portColor": "#491389",
                    "portId": "left0"
                }],
                "topArray": [{
                    "portColor": "#77ac1e",
                    "portId": "top0"
                }],
                "bottomArray": [{
                    "portColor": "#e9701b",
                    "portId": "bottom0"
                }],
                "rightArray": [{
                    "portColor": "#24d05e",
                    "portId": "right0"
                }, {
                    "portColor": "#cfabaa",
                    "portId": "right1"
                }]
            }
        ],
        "linkDataArray": [{
                "from": 4,
                "to": 2,
                "fromPort": "top0",
                "toPort": "bottom0"
            },
            {
                "from": 4,
                "to": 2,
                "fromPort": "top0",
                "toPort": "bottom0"
            },
            {
                "from": 3,
                "to": 2,
                "fromPort": "top0",
                "toPort": "bottom1"
            },
            {
                "from": 4,
                "to": 3,
                "fromPort": "right0",
                "toPort": "left0"
            },
            {
                "from": 4,
                "to": 3,
                "fromPort": "right1",
                "toPort": "left2"
            },
            {
                "from": 1,
                "to": 2,
                "fromPort": "right0",
                "toPort": "left1"
            },
            {
                "from": 1,
                "to": 2,
                "fromPort": "right1",
                "toPort": "left2"
            }
        ]
    });
}

init();

// This custom-routing Link class tries to separate parallel links from each other.
// This assumes that ports are lined up in a row/column on a side of the node.
// 重绘路由线路，分离并行的line
function CustomLink() {
    go.Link.call(this);
}
go.Diagram.inherit(CustomLink, go.Link);

CustomLink.prototype.findSidePortIndexAndCount = function (node, port) {
    var nodedata = node.data;
    if (nodedata !== null) {
        var portdata = port.data;
        var side = port._side;
        var arr = nodedata[side + "Array"];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] === portdata) return [i, len];
        }
    }
    return [-1, len];
};

/** @override */
CustomLink.prototype.computeEndSegmentLength = function (node, port, spot, from) {
    var esl = go.Link.prototype.computeEndSegmentLength.call(this, node, port, spot, from);
    var other = this.getOtherPort(port);
    if (port !== null && other !== null) {
        var thispt = port.getDocumentPoint(this.computeSpot(from));
        var otherpt = other.getDocumentPoint(this.computeSpot(!from));
        if (Math.abs(thispt.x - otherpt.x) > 20 || Math.abs(thispt.y - otherpt.y) > 20) {
            var info = this.findSidePortIndexAndCount(node, port);
            var idx = info[0];
            var count = info[1];
            if (port._side == "top" || port._side == "bottom") {
                if (otherpt.x < thispt.x) {
                    return esl + 4 + idx * 8;
                } else {
                    return esl + (count - idx - 1) * 8;
                }
            } else { // left or right
                if (otherpt.y < thispt.y) {
                    return esl + 4 + idx * 8;
                } else {
                    return esl + (count - idx - 1) * 8;
                }
            }
        }
    }
    return esl;
};

/** @override */
CustomLink.prototype.hasCurviness = function () {
    if (isNaN(this.curviness)) return true;
    return go.Link.prototype.hasCurviness.call(this);
};

/** @override */
CustomLink.prototype.computeCurviness = function () {
    if (isNaN(this.curviness)) {
        var fromnode = this.fromNode;
        var fromport = this.fromPort;
        var fromspot = this.computeSpot(true);
        var frompt = fromport.getDocumentPoint(fromspot);
        var tonode = this.toNode;
        var toport = this.toPort;
        var tospot = this.computeSpot(false);
        var topt = toport.getDocumentPoint(tospot);
        if (Math.abs(frompt.x - topt.x) > 20 || Math.abs(frompt.y - topt.y) > 20) {
            if ((fromspot.equals(go.Spot.Left) || fromspot.equals(go.Spot.Right)) &&
                (tospot.equals(go.Spot.Left) || tospot.equals(go.Spot.Right))) {
                var fromseglen = this.computeEndSegmentLength(fromnode, fromport, fromspot, true);
                var toseglen = this.computeEndSegmentLength(tonode, toport, tospot, false);
                var c = (fromseglen - toseglen) / 2;
                if (frompt.x + fromseglen >= topt.x - toseglen) {
                    if (frompt.y < topt.y) return c;
                    if (frompt.y > topt.y) return -c;
                }
            } else if ((fromspot.equals(go.Spot.Top) || fromspot.equals(go.Spot.Bottom)) &&
                (tospot.equals(go.Spot.Top) || tospot.equals(go.Spot.Bottom))) {
                var fromseglen = this.computeEndSegmentLength(fromnode, fromport, fromspot, true);
                var toseglen = this.computeEndSegmentLength(tonode, toport, tospot, false);
                var c = (fromseglen - toseglen) / 2;
                if (frompt.x + fromseglen >= topt.x - toseglen) {
                    if (frompt.y < topt.y) return c;
                    if (frompt.y > topt.y) return -c;
                }
            }
        }
    }
    return go.Link.prototype.computeCurviness.call(this);
};
// end CustomLink class


// Add a port to the specified side of the selected nodes.
// function addPort(side) {
//     myDiagram.startTransaction("addPort");
//     myDiagram.selection.each(function (node) {
//         // skip any selected Links
//         if (!(node instanceof go.Node)) return;
//         // compute the next available index number for the side
//         var i = 0;
//         while (node.findPort(side + i.toString()) !== node) i++;
//         // now this new port name is unique within the whole Node because of the side prefix
//         var name = side + i.toString();
//         // get the Array of port data to be modified
//         var arr = node.data[side + "Array"];
//         if (arr) {
//             // create a new port data object
//             var newportdata = {
//                 portId: name,
//                 portColor: go.Brush.randomColor()
//                 // if you add port data properties here, you should copy them in copyPortData above
//             };
//             // and add it to the Array of port data
//             myDiagram.model.insertArrayItem(arr, -1, newportdata);
//         }
//     });
//     myDiagram.commitTransaction("addPort");
// }

// Exchange the position/order of the given port with the next one.
// If it's the last one, swap with the previous one.
// function swapOrder(port) {
//     var arr = port.panel.itemArray;
//     if (arr.length >= 2) { // only if there are at least two ports!
//         for (var i = 0; i < arr.length; i++) {
//             if (arr[i].portId === port.portId) {
//                 myDiagram.startTransaction("swap ports");
//                 if (i >= arr.length - 1) i--; // now can swap I and I+1, even if it's the last port
//                 var newarr = arr.slice(0); // copy Array
//                 newarr[i] = arr[i + 1]; // swap items
//                 newarr[i + 1] = arr[i];
//                 // remember the new Array in the model
//                 myDiagram.model.setDataProperty(port.part.data, port._side + "Array", newarr);
//                 myDiagram.commitTransaction("swap ports");
//                 break;
//             }
//         }
//     }
// }

// Remove the clicked port from the node.
// Links to the port will be redrawn to the node's shape.
// function removePort(port) {
//     myDiagram.startTransaction("removePort");
//     var pid = port.portId;
//     var arr = port.panel.itemArray;
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].portId === pid) {
//             myDiagram.model.removeArrayItem(arr, i);
//             break;
//         }
//     }
//     myDiagram.commitTransaction("removePort");
// }

// Remove all ports from the same side of the node as the clicked port.
// function removeAll(port) {
//     myDiagram.startTransaction("removePorts");
//     var nodedata = port.part.data;
//     var side = port._side; // there are four property names, all ending in "Array"
//     myDiagram.model.setDataProperty(nodedata, side + "Array", []); // an empty Array
//     myDiagram.commitTransaction("removePorts");
// }

// Change the color of the clicked port.
// function changeColor(port) {
//     myDiagram.startTransaction("colorPort");
//     var data = port.data;
//     myDiagram.model.setDataProperty(data, "portColor", go.Brush.randomColor());
//     myDiagram.commitTransaction("colorPort");
// }

// Save the model to / load it from JSON text shown on the page itself, not in a database.
// function save() {
//     document.getElementById("mySavedModel").value = myDiagram.model.toJson();
//     myDiagram.isModified = false;
// }

function load() {


    // When copying a node, we need to copy the data that the node is bound to.
    // This JavaScript object includes properties for the node as a whole, and
    // four properties that are Arrays holding data for each port.
    // Those arrays and port data objects need to be copied too.
    // Thus Model.copiesArrays and Model.copiesArrayObjects both need to be true.

    // Link data includes the names of the to- and from- ports;
    // so the GraphLinksModel needs to set these property names:
    // linkFromPortIdProperty and linkToPortIdProperty.
}