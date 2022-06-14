import React, { Component } from "react";
import styles from "./less/mealrow.less";
import moment from "moment";

const EventRow = ({ description, day, start_timestamp, end_timestamp})=>{
  return (
    <div
      className={[styles.mealrow, styles.schedulerow].join(" ")}
    >
      <div className={[styles.upperrow, styles.mealrow_time].join(" ")}>
        <span>{day} {moment(`2018-06-09 ${start_timestamp}`).format("HH:mm")} - {moment(`2018-06-09 ${end_timestamp}`).format("HH:mm")}</span>
      </div>
      {description} 
    </div>
  );
}

export default EventRow