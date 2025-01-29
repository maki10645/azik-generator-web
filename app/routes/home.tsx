import axios from "axios";
import type { Route } from "./+types/home";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const token = form.get("token");
  const sequence = form.get("sequence");
  const sokuon = form.get("sokuon");
  const hatsuon = form.get("hatsuon");

  const res = await axios.post("https://azik-generator-web-i0sb.shuttle.app", {
    Sequence: [{ Sequence: sequence, Token: token }],
    Sokuon: sokuon,
    Hatsuon: hatsuon,
  });

  return res;
}

export default function Home({ actionData }: Route.ComponentProps) {
  const AzikFile = String(actionData?.data);
  const DownloadButton = "data:text/plain;charset=utf-8," +
    encodeURIComponent(AzikFile);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2e3440]">
      <div className="flex flex-col items-center justify-center border-2 border-[#d8dee9] rounded-xl">
        <h1 className="text-3xl text-[#d8dee9] m-5 mt-5">AzikGeneratorWeb</h1>
        <Form
          method="POST"
          className="flex flex-col items center justify-center rounded-2xl"
        >
          <div className="flex flex-col items-end justify-center bg-[#2e3440] rounded-2xl">
            <label className="m-2 text-xl">
              token
              <input
                className="bg-[#4c566a] my-2 ml-2 rounded-md"
                type="text"
                name="token"
                placeholder="z"
              />
            </label>
            <label className="m-2 text-xl">
              sequence
              <input
                className="bg-[#4c566a] my-2 ml-2 rounded-md"
                type="text"
                name="sequence"
                placeholder="ann"
              />
            </label>
            <label className="m-2 text-xl">
              sokuon
              <input
                className="bg-[#4c566a] my-2 ml-2 rounded-md"
                type="text"
                name="sokuon"
                placeholder=";"
              />
            </label>
            <label className="m-2 text-xl">
              hatsuon
              <input
                className="bg-[#4c566a] my-2 ml-2 rounded-md"
                type="text"
                name="hatsuon"
                placeholder="q"
              />
            </label>
          </div>
          <div className="flex flwex-col items-center justify-center">
            <button
              className="bg-[#444444] mb-2 py-1.5 w-sm rounded-xl"
              type="submit"
            >
              send
            </button>
          </div>
        </Form>
        {actionData
          ? (
            <p>
              <div className="flex items-center justify-center">
                <a
                  className="bg-[#444444] mb-2 py-1.5 w-sm rounded-xl text-center"
                  href={DownloadButton}
                  download="GoogleIMEKanaTable.txt"
                >
                  DownloadKanaTable
                </a>
              </div>
            </p>
          )
          : null}
      </div>
    </div>
  );
}
