import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ArcProgressBar } from 'react-native-segmented-arc';

const App = () => {
  const [showArcRanges, setShowArcRanges] = useState(false);

  const segments = [
    {
      scale: 0.25,
      filledColor: '#C70039',
      emptyColor: '#F2F3F5',
      data: { label: 'Not bad!' }
    },
    {
      scale: 0.25,
      filledColor: '#404FCD',
      emptyColor: '#F2F3F5',
      data: { label: 'Good!' }
    },
    {
      scale: 0.25,
      filledColor: '#EBD22F',
      emptyColor: '#F2F3F5',
      data: { label: 'Very Good!' }
    },
    {
      scale: 0.25,
      filledColor: '#44CD40',
      emptyColor: '#F2F3F5',
      data: { label: 'Excellent!' }
    }
  ];

  const ranges = ['10%', '20%', '30%', '40%', '50%'];

  const _handlePress = () => {
    setShowArcRanges(!showArcRanges);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ArcProgressBar
        segments={segments}
        fillValue={70}
        isAnimated={true}
        animationDelay={1000}
        showArcRanges={showArcRanges}
        ranges={ranges}
      >
        {data => (
          <Pressable onPress={_handlePress} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, paddingTop: 16 }}>{data.lastFilledSegment.data.label}</Text>
            <Text style={{ lineHeight: 80, fontSize: 24 }}>More info</Text>
          </Pressable>
        )}
      </ArcProgressBar>
    </View>
  )
}

export default App