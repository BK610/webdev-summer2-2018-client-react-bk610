import React from 'react'

export const HeadingWidget =
    ({widget, preview, textChange, sizeChange, titleChange}) => {
        let title;
        let text;
        let size;
        return (
            <div>
                <div hidden={preview}>
                    <h3>Heading Widget</h3>
                    <input onChange={() => titleChange(widget.id, title.value)}
                           value={widget.name}
                           className="form-control"
                           placeholder="Widget title"
                           ref={node => title = node}/>
                    <input onChange={() => textChange(widget.id, text.value)}
                           value={widget.text}
                           className="form-control"
                           placeholder="Heading text"
                           ref={node => text = node}/>
                    <select onChange={() => sizeChange(widget.id, size.value)}
                            value={widget.size}
                            className="form-control"
                            ref={node => size = node}>
                        <option value="1">Heading size 1</option>
                        <option value="2">Heading size 2</option>
                        <option value="3">Heading size 3</option>
                    </select>
                    <h5 style={{paddingTop: 10}}>Preview</h5>
                </div>
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        )
    };