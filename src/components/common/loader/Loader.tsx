import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import "./Loader.scss";

const Loader = () => {
  const { isLoading } = useSelector((store: any) => store.loading);
  return (
    <>
      {isLoading && (
        <div className="my_eclipse">
          <div className="progress">
            <div>
              <InfinitySpin width="200" color="#002F34" />
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
