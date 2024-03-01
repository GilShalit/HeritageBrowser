import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight 
} from 'react-icons/hi';

type AggregationsCarouselProps = {

  aggregations: string[]

  labels?: string[]

  activeAggregation?: string

  onChangeAggregation: Function

}

export const AggregationsCarousel = (props: AggregationsCarouselProps) => {

  const { t } = useTranslation();

  const activeAggregation = props.activeAggregation || props.aggregations[0] || '';

  const labelKey = props.labels ?
    props.labels[props.aggregations.indexOf(activeAggregation)] : activeAggregation;

  const label = t(labelKey);

  const onChangeAggregation = (inc: number) => () => {
    const { length } = props.aggregations;
    const currentIdx = props.aggregations.indexOf(activeAggregation);
    const updatedIdx = (currentIdx + inc + length) % length;
    props.onChangeAggregation(props.aggregations[updatedIdx]);
  }

  return (
    <div className="p6o-aggs-carousel">
      <button 
        tabIndex={4}
        aria-label="Previous filter category"
        onClick={onChangeAggregation(-1)}>
        <HiOutlineChevronLeft />
      </button>
        
      <h3 
        aria-live="polite"
        aria-atomic={true}>
        {label}
      </h3>
      
      <button
        tabIndex={5}
        aria-label="Next filter category"
        onClick={onChangeAggregation(1)}>
        <HiOutlineChevronRight />
      </button>
    </div>
  )

}