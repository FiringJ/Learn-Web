import React, {Component} from 'react'
import json from './config.json'
import styles from './Greeter.css'

class Greeter extends Component {
  render() {
    return (
      <div className={styles.root}>
        {json.greetText}
      </div>
    )
  }
}

export default Greeter
