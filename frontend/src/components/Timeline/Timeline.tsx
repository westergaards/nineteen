/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { Box } from "@material-ui/core";
import { format } from "date-fns";
import ReactHtmlParser from "react-html-parser";
import { Timeline as RsuiteTimeline } from "rsuite";
import { timeline } from "../models/timeline";
import styles from "./Timeline.module.css";

export const Timeline = (props: any) => {
  return (
    <RsuiteTimeline align={props.align}>
      {Object.entries(timeline).map(([key, value]) => {
        return (
          <RsuiteTimeline.Item>
            <Box className={styles.container} p={0.5}>
              <Box className={styles.datetime} pb={0.5}>
                {format(new Date(+key), "MM/dd/yyyy")}
              </Box>
              <Box className={styles.value}>{ReactHtmlParser(value)}</Box>
            </Box>
          </RsuiteTimeline.Item>
        );
      })}
    </RsuiteTimeline>
  );
};
