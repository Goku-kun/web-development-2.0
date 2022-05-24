import { useParams } from "react-router-dom";

function Page404() {
  const params = useParams();

  return (
    <h1>This requested resource on this {params["*"]}path doesn't exist.</h1>
  );
}

export default Page404;
