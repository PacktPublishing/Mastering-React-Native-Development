/*
Based on this Medium Article:
https://medium.com/react-native-training/progressive-image-loading-in-react-native-e7a01827feb7
*/

import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    flex: 1,
  }
})

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0)

  imageAnimated = new Animated.Value(0)

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start()
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start()
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props

    return (
      <View style={styles.container}>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, style, { opacity: this.imageAnimated }]}
          onLoad={this.onImageLoad}
        />
      </View>
    )
  }
}

export default ProgressiveImage