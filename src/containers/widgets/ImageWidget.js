import React from 'react'

export const ImageWidget =
    ({widget, preview, urlChange, titleChange}) => {
        let text;
        let title;
        return (
            <div>
                <div hidden={preview}>
                    <h4>Image Widget</h4>
                    <textarea onChange={() => urlChange(widget.id, text.value)}
                              value={widget.url}
                              className="form-control"
                              placeholder="Image URL"
                              ref={node => text = node}/>
                    <input onChange={() => titleChange(widget.id, title.value)}
                           value={widget.title}
                           className="form-control"
                           placeholder="Widget title"
                           ref={node => title = node}/>
                    <h5>
                        Preview
                    </h5>
                </div>
                <div id="image-div" style={{overflow: `hidden`}}>
                    <img src={widget.url}/>
                </div>
            </div>
        );
    };
