import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";

// Got the higher-order component from https://blog.bitsrc.io/building-a-universal-higher-order-component-page-loader-for-your-react-app-46d74f7a6958
export const LoadingWrapper = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = (isLoading) => {
      setLoading(isLoading);
    };
    return (
      <>
        {isLoading && (
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        )}
        <WrappedComponent
          {...props}
          setLoading={setLoadingState}
          isLoading={isLoading}
        />
      </>
    );
  };
  return Wrapper;
};

export default LoadingWrapper;
