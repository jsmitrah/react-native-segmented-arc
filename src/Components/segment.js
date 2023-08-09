import React, { useEffect, useRef, useContext } from 'react';
import { Animated } from 'react-native';
import { G, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { ArcProgressBarContext } from '../arcProgressBar';
import { drawArc } from '../ArcHelper/drawarc';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Segment = ({ arc }) => {
    const arcProgressBarContext = useContext(ArcProgressBarContext);
    const { filledArcWidth, radius, isAnimated, emptyArcWidth, arcAnimatedValue } = arcProgressBarContext;

    const arcRef = useRef();
    const animationComplete = useRef(false);

    useEffect(() => {
        if(!isAnimated) return;
        const listener = arcAnimatedValue.addListener(v => {
            if(!arcRef.current) return;
            if(animationComplete.current) return;
            if(v.value <= arc.start) return;

            if(v.value >= arc.end) {
                arcRef.current.setNativeProps({
                    d: drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)
                });
                animationComplete.current = true;
            } else {
                arcRef.current.setNativeProps({
                    d: drawArc(arc.centerX, arc.centerY, radius, arc.start, v.value)
                });
            }
        });

        return () => arcAnimatedValue.removeListener(listener);
    }, []);

    return (
        <G>
            <Path
                fill="none"
                stroke={arc.emptyColor}
                strokeWidth={emptyArcWidth}
                d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)}
            />

            {isAnimated && arc.filled > arc.start && (
                <AnimatedPath ref={arcRef} fill="none" stroke={arc.filledColor} strokeWidth={filledArcWidth} />
            )}

            {!isAnimated && arc.filled > arc.start && (
                <Path
                    fill="none"
                    stroke={arc.filledColor}
                    strokeWidth={filledArcWidth}
                    d={drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.filled)}
                />
            )}
        </G>
    );
};

Segment.propTypes = {
    arc: PropTypes.object
};

export default Segment;
