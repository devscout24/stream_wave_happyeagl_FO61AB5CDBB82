"use client";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function LastSeen({ date }: { date: Date }) {
  return <ReactTimeAgo date={date} locale="en-US" />;
}
