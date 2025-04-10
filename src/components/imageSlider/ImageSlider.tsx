import React ,{ useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const {width} = Dimensions.get("window");

const images = [
    require('@/assets/imageSlider/slider1.jpg'),
    require('@/assets/imageSlider/slider2.jpg'),
    require('@/assets/imageSlider/slider3.jpg'),
    require('@/assets/imageSlider/slider4.jpg'),
    require('@/assets/imageSlider/slider5.jpg'),
]

const ImageSlider = () => {
    const flatListRef = useRef<FlatList>(null);
    const [index, setIndex] = useState(0);

   useEffect(() =>{
    const timer = setInterval(()=>{
        const nextIndex = (index + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
   }, [index])


   
  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} resizeMode="cover" />
        )}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    sliderContainer: {
      height: 200,
      width: '100%',
      marginTop: 10,
    },
    image: {
      width: width,
      height: 150,
    //   borderRadius: 10,
    },
  });
  
  export default ImageSlider;