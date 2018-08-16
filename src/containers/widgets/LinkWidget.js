import React from 'react'

export const LinkWidget =
    ({widget, preview, textChange, titleChange, urlChange}) => {
        let url;
        let text;
        let title;
        return (
            <div>
                <div hidden={preview}>
                    <h4>Link Widget</h4>
                    <textarea onChange={() => urlChange(widget.id, url.value)}
                              value={widget.url}
                              className="form-control"
                              placeholder="Link URL"
                              ref={node => url = node}/>
                    <textarea onChange={() => textChange(widget.id, text.value)}
                              value={widget.text}
                              className="form-control"
                              placeholder="Link text"
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
                    <a href={widget.url}>{widget.text}</a>
                </div>
            </div>
        );
    };
