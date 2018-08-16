import React from 'react'

export const ParagraphWidget =
    ({widget, preview, textChange, titleChange}) => {
        let text;
        let title;
        return (
            <div>
                <div hidden={preview}>
                    <h3>Paragraph Widget</h3>
                    <input onChange={() => titleChange(widget.id, title.value)}
                           value={widget.title}
                           className="form-control"
                           placeholder="Widget title"
                           ref={node => title = node}/>
                    <textarea onChange={() => textChange(widget.id, text.value)}
                              value={widget.text}
                              className="form-control"
                              placeholder="Paragraph text"
                              ref={node => text = node}/>

                    <h5>
                        Preview
                    </h5>
                </div>
                {widget.text}
            </div>
        );
    };
