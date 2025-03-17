// import { useState, useEffect, useRef } from "react";

// // Canvas Component
// const Canvas = ({ isOpen, onClose }) => {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [tool, setTool] = useState("pen");
//   const [color, setColor] = useState("#000000");
//   const [isTyping, setIsTyping] = useState(false);
//   const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
//   const [brushSize, setBrushSize] = useState(2);
//   const [history, setHistory] = useState([]);
//   const [historyStep, setHistoryStep] = useState(-1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isDraggingImage, setIsDraggingImage] = useState(false);
//   const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
//   const [isEditing, setIsEditing] = useState(false);
//   const editorRef = useRef(null);
//   const [selectedText, setSelectedText] = useState(null);
//   const [textStyle, setTextStyle] = useState({
//     bold: false,
//     italic: false,
//     size: 'normal', // normal, h1, h2, h3
//     list: false
//   });

//   const TextEditor = () => {
//     if (!isEditing) return null;

//     return (
//       <div 
//         className="absolute inset-0 bg-white bg-opacity-90"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Text Formatting Toolbar */}
//         <div className="sticky top-0 bg-white border-b p-2 flex items-center gap-2">
//           <button
//             onClick={() => setTextStyle(prev => ({ ...prev, bold: !prev.bold }))}
//             className={`p-2 rounded ${textStyle.bold ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M7 8h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H7v-3zm0 4h4c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H7v-3z"/>
//             </svg>
//           </button>
//           <button
//             onClick={() => setTextStyle(prev => ({ ...prev, italic: !prev.italic }))}
//             className={`p-2 rounded ${textStyle.italic ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 4v2h2.5l-4 8H6v2h8v-2h-2.5l4-8H18V4z"/>
//             </svg>
//           </button>
//           <select
//             value={textStyle.size}
//             onChange={(e) => setTextStyle(prev => ({ ...prev, size: e.target.value }))}
//             className="p-2 border rounded"
//           >
//             <option value="normal">Normal</option>
//             <option value="h1">Heading 1</option>
//             <option value="h2">Heading 2</option>
//             <option value="h3">Heading 3</option>
//           </select>
//           <button
//             onClick={() => setTextStyle(prev => ({ ...prev, list: !prev.list }))}
//             className={`p-2 rounded ${textStyle.list ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
//             </svg>
//           </button>
//           <button
//             onClick={() => toggleEmojiPicker()}
//             className="p-2 rounded hover:bg-gray-100"
//           >
//             😊
//           </button>
//           <button
//             onClick={applyTextToCanvas}
//             className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Done
//           </button>
//         </div>

//         {/* Editable Content Area */}
//         <div
//           ref={editorRef}
//           contentEditable
//           className="p-4 min-h-[200px] focus:outline-none"
//           style={{
//             fontFamily: 'Arial',
//             fontSize: textStyle.size === 'normal' ? '16px' : 
//                      textStyle.size === 'h1' ? '32px' : 
//                      textStyle.size === 'h2' ? '24px' : '20px'
//           }}
//           onKeyDown={handleEditorKeyDown}
//         />
//       </div>
//     );
//   };

//   const handleEditorKeyDown = (e) => {
//     if (e.key === 'Tab') {
//       e.preventDefault();
//       document.execCommand('insertText', false, '    ');
//     }
//   };

//   const applyTextToCanvas = () => {
//     if (!editorRef.current) return;

//     const context = contextRef.current;
//     context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
//     // Convert HTML content to canvas text with styling
//     const content = editorRef.current.innerHTML;
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(content, 'text/html');
    
//     let y = 20; // Starting y position
//     const lineHeight = 1.2;

//     doc.body.childNodes.forEach(node => {
//       if (node.nodeType === Node.TEXT_NODE) {
//         const text = node.textContent.trim();
//         if (text) {
//           context.font = `16px Arial`;
//           context.fillText(text, 20, y);
//           y += 20 * lineHeight;
//         }
//       } else if (node.nodeType === Node.ELEMENT_NODE) {
//         const element = node;
//         const text = element.textContent.trim();
//         if (text) {
//           let fontSize = 16;
//           let fontStyle = '';
          
//           if (element.tagName === 'H1') fontSize = 32;
//           if (element.tagName === 'H2') fontSize = 24;
//           if (element.tagName === 'H3') fontSize = 20;
//           if (element.style.fontWeight === 'bold') fontStyle += 'bold ';
//           if (element.style.fontStyle === 'italic') fontStyle += 'italic ';
          
//           context.font = `${fontStyle}${fontSize}px Arial`;
          
//           if (element.tagName === 'LI') {
//             context.fillText('• ' + text, 40, y);
//           } else {
//             context.fillText(text, 20, y);
//           }
          
//           y += fontSize * lineHeight;
//         }
//       }
//     });

//     setIsEditing(false);
//     saveState();
//   };

//   const handleCanvasClick = (e) => {
//     if (tool === 'text') {
//       setIsEditing(true);
//     }
//   };

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//     saveState();
//   };


//   // Add text editor overlay
 

//   useEffect(() => {
//     if (!isOpen) return;

//     const canvas = canvasRef.current;
//     canvas.width = canvas.offsetWidth * 2;
//     canvas.height = canvas.offsetHeight * 2;
//     canvas.style.width = `${canvas.offsetWidth}px`;
//     canvas.style.height = `${canvas.offsetHeight}px`;

//     const context = canvas.getContext("2d");
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = color;
//     context.lineWidth = brushSize;
//     contextRef.current = context;
//   }, [isOpen]);

//   const saveState = () => {
//     const canvas = canvasRef.current;
//     const newHistory = history.slice(0, historyStep + 1);
//     newHistory.push(canvas.toDataURL());
//     setHistory(newHistory);
//     setHistoryStep(newHistory.length - 1);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.src = event.target.result;
//         img.onload = () => {
//           setSelectedImage(img);
//           setImagePosition({
//             x: canvasRef.current.width / 4 - img.width / 2,
//             y: canvasRef.current.height / 4 - img.height / 2,
//           });
//           drawImage(img);
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const drawImage = (img, x = imagePosition.x, y = imagePosition.y) => {
//     const context = contextRef.current;
//     context.drawImage(img, x, y);
//     saveState();
//   };



//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = nativeEvent;

//     if (tool === "pen") {
//       contextRef.current.lineTo(offsetX, offsetY);
//       contextRef.current.stroke();
//     } else if (tool === "eraser") {
//       contextRef.current.strokeStyle = "#ffffff";
//       contextRef.current.lineTo(offsetX, offsetY);
//       contextRef.current.stroke();
//       contextRef.current.strokeStyle = color;
//     }
//   };

 

//   const undo = () => {
//     if (historyStep > 0) {
//       setHistoryStep(historyStep - 1);
//       const img = new Image();
//       img.src = history[historyStep - 1];
//       img.onload = () => {
//         const context = contextRef.current;
//         context.clearRect(
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         context.drawImage(img, 0, 0);
//       };
//     }
//   };


//   const redo = () => {
//     if (historyStep < history.length - 1) {
//       setHistoryStep(historyStep + 1);
//       const img = new Image();
//       img.src = history[historyStep + 1];
//       img.onload = () => {
//         const context = contextRef.current;
//         context.clearRect(
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height
//         );
//         context.drawImage(img, 0, 0);
//       };
//     }
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     saveState();
//   };

//   const canvasEvents = {
//     onMouseDown: tool === 'text' ? handleCanvasClick : startDrawing,
//     onMouseUp: tool === 'text' ? null : finishDrawing,
//     onMouseMove: tool === 'text' ? null : draw,
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-4 w-[1200px]">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Canvas</h3>
//           <div className="flex items-center gap-4">
//             {/* Tools */}
//             <div className="flex gap-2">
//               {["pen", "eraser", "text"].map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTool(t)}
//                   className={`px-3 py-1 rounded-md ${
//                     tool === t
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100 hover:bg-gray-200"
//                   }`}
//                 >
//                   {t.charAt(0).toUpperCase() + t.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Color Picker */}
//             <input
//               type="color"
//               value={color}
//               onChange={(e) => {
//                 setColor(e.target.value);
//                 contextRef.current.strokeStyle = e.target.value;
//               }}
//               className="w-8 h-8 rounded-md cursor-pointer"
//             />

//             {/* Brush Size */}
//             <input
//               type="range"
//               min="1"
//               max="20"
//               value={brushSize}
//               onChange={(e) => {
//                 setBrushSize(e.target.value);
//                 contextRef.current.lineWidth = e.target.value;
//               }}
//               className="w-32"
//             />

//             {/* Image Upload */}
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleImageUpload}
//               accept="image/*"
//               className="hidden"
//             />
//             <button
//               onClick={() => fileInputRef.current.click()}
//               className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded-md"
//             >
//               Add Image
//             </button>

//             {/* Undo/Redo */}
//             <button
//               onClick={undo}
//               disabled={historyStep <= 0}
//               className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
//             >
//               Undo
//             </button>
//             <button
//               onClick={redo}
//               disabled={historyStep >= history.length - 1}
//               className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
//             >
//               Redo
//             </button>

//             {/* Clear/Close */}
//             <button
//               onClick={clearCanvas}
//               className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
//             >
//               Clear
//             </button>
//             <button
//               onClick={onClose}
//               className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>

//         <div className="relative flex-1">
//           <canvas
//             ref={canvasRef}
//             {...canvasEvents}
//             className={`border rounded-lg w-full h-[500px] ${
//               tool === 'text' ? 'cursor-text' : 'cursor-crosshair'
//             }`}
//           />
//           {TextEditor()}
//         </div>
//         {/* <canvas
//           ref={canvasRef}
//           {...canvasEvents}
//           onMouseDown={startDrawing}
//           onMouseUp={finishDrawing}
//           onMouseMove={draw}
//           className="border rounded-lg w-full h-[500px] cursor-crosshair"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default Canvas;

import { useState, useEffect, useRef } from "react";
import EmojiPicker from 'emoji-picker-react'; // Install this package first

const Canvas = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const editorRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [isOpen]);

  const formatText = (command, value = null) => {
    const selection = window.getSelection();
    if (!selection.toString() && !['insertUnorderedList'].includes(command)) {
      return;
    }

    if (command === 'heading') {
      const size = value === 'h1' ? '32px' : value === 'h2' ? '24px' : '20px';
      const selected = selection.getRangeAt(0);
      const span = selected.extractContents();
      const wrapper = document.createElement('span');
      wrapper.style.fontSize = size;
      wrapper.appendChild(span);
      selected.insertNode(wrapper);
    } else {
      document.execCommand(command, false, value);
    }
    editorRef.current?.focus();
  };

  const insertEmoji = (emojiData) => {
    document.execCommand('insertText', false, emojiData.emoji);
    setShowEmojiPicker(false);
    editorRef.current?.focus();
  };

  const TextEditor = () => {
    if (!isEditing) return null;

    return (
      <div className="absolute inset-0 bg-white bg-opacity-90">
        <div className="sticky top-0 bg-white border-b p-2 flex items-center gap-2 shadow-sm">
          <button
            onClick={() => formatText('bold')}
            className={`p-2 rounded hover:bg-gray-100 ${
              document.queryCommandState('bold') ? 'bg-blue-100' : ''
            }`}
          >
            <strong>B</strong>
          </button>

          <button
            onClick={() => formatText('italic')}
            className={`p-2 rounded hover:bg-gray-100 ${
              document.queryCommandState('italic') ? 'bg-blue-100' : ''
            }`}
          >
            <em>I</em>
          </button>

          <div className="relative inline-block">
            <select
              onChange={(e) => formatText('heading', e.target.value)}
              className="p-2 border rounded hover:bg-gray-50"
            >
              <option value="">Normal</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
          </div>

          <button
            onClick={() => formatText('insertUnorderedList')}
            className={`p-2 rounded hover:bg-gray-100 ${
              document.queryCommandState('insertUnorderedList') ? 'bg-blue-100' : ''
            }`}
          >
            • List
          </button>

          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded hover:bg-gray-100"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute top-full left-0 z-50">
                <EmojiPicker onEmojiClick={insertEmoji} />
              </div>
            )}
          </div>

          <button
            onClick={applyTextToCanvas}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Done
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="p-4 min-h-[200px] focus:outline-none prose max-w-none"
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              document.execCommand('insertText', false, '    ');
            }
            if (e.ctrlKey && e.key === 'b') {
              e.preventDefault();
              formatText('bold');
            }
            if (e.ctrlKey && e.key === 'i') {
              e.preventDefault();
              formatText('italic');
            }
          }}
        />
      </div>
    );
  };

  const applyTextToCanvas = () => {
    if (!editorRef.current) return;

    const context = contextRef.current;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const processNode = (node, x = 20, y = 20) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      const style = window.getComputedStyle(node);
      const fontSize = parseInt(style.fontSize);
      const isBold = style.fontWeight >= 600;
      const isItalic = style.fontStyle === 'italic';
      
      context.font = `${isItalic ? 'italic' : ''} ${isBold ? 'bold' : ''} ${fontSize}px Arial`.trim();
      
      let currentX = x;
      let currentY = y;
      
      if (node.nodeName === 'LI') {
        context.fillText('•', currentX - 15, currentY);
        currentX += 20;
      }

      let text = '';
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          text += child.textContent;
        } else {
          text += processNode(child, currentX, currentY);
        }
      });

      if (text.trim()) {
        context.fillText(text, currentX, currentY);
        return '';
      }

      return text;
    };

    let y = 30;
    editorRef.current.childNodes.forEach(node => {
      processNode(node, 20, y);
      y += 24; // Line height
    });

    setIsEditing(false);
  };

  // Drawing functions
  const startDrawing = ({ nativeEvent }) => {
    if (tool === 'text') {
      setIsEditing(true);
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || tool === 'text') return;
    
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[800px] h-[600px] relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {['pen', 'text', 'eraser'].map((t) => (
              <button
                key={t}
                onClick={() => setTool(t)}
                className={`px-3 py-1 rounded ${
                  tool === t ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={finishDrawing}
            onMouseLeave={finishDrawing}
            className={`border rounded-lg w-full h-[500px] ${
              tool === 'text' ? 'cursor-text' : 'cursor-crosshair'
            }`}
          />
          {TextEditor()}
        </div>
      </div>
    </div>
  );
};

export default Canvas;