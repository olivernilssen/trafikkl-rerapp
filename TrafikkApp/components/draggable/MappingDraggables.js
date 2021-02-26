/* eslint-disable prettier/prettier */
import React from 'react';
import Draggable from './Draggable';

const MappingDraggable = React.memo((props) => {
    //Get props
    const {
        draggables,
        setDraggables,
        setTrashHover,
        dropZoneValues,
        onRemoveItem,
    } = props;

    return (
        <>
            {draggables.map((itemInfo) => {
                return (
                    <Draggable
                        key={itemInfo.id}
                        onTrashHover={setTrashHover}
                        id={itemInfo.id}
                        source={itemInfo.source}
                        onRemoveItem={onRemoveItem}
                        dropZoneValues={dropZoneValues}
                        tintColor={'red'}
                    />
                );
            })}
        </>
    );
});

export default MappingDraggable;
