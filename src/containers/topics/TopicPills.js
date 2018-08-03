import React from 'react'

export default class TopicPills extends React.Component {
  render() {
    return(
      <div>
        <h3>Topic Pills</h3>
        {this.props.newLesson.topics.length}
        <ul>
          {this.props.newLesson.topics.map(
            (lesson, i) => {
              return (
                <li key={i}>{lesson.title}</li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}
