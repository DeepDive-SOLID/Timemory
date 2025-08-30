import React from "react";
import DateCapsule from "../components/Domain/Group/DateCapsule";
import MapCapsule from "../components/Domain/Group/MapCapsule";
import ConditionCapsule from "../components/Domain/Group/ConditionCapsule";

const GroupInner = () => {
  return (
    <>
      <DateCapsule />
      <MapCapsule />
      <ConditionCapsule />
    </>
  );
};

export default GroupInner;
