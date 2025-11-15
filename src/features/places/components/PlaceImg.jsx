<<<<<<< HEAD

=======
>>>>>>> 91efd9998147dbc4f0908723ead972c9053db651
import React from 'react';

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={place.photos[index]} alt="" className={className} />;
};

export default PlaceImg;
