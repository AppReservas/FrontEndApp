import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StarRatingProps } from '../interfaces/appInterfaces'


const StarRating: React.FC<StarRatingProps> = ({maxStars, rating, onRate}) => {
    const [ selectedStars, setSelectedStars] = useState(rating);

    const handleStarPress = (star: number) => {
        setSelectedStars(star);
        onRate(star);
    };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        {[...Array(maxStars)].map((_, index)=> (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                <Icon
                    name={index < selectedStars ? 'star' : 'star-outline'}
                    size={30}
                    color={index < selectedStars ? 'gold' : 'grey'}
                />
            </TouchableOpacity>
        ))}
        <Text style={{ marginLeft: 10}}>{selectedStars}/{maxStars}</Text>
    </View>
  );
};

export default StarRating

