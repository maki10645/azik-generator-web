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
    <div className="min-h-svh flex flex-col items-center justify-center bg-[#2e3440] overflow-hidden">
      <div className="flex flex-col items-center justify-center border-2 border-[#d8dee9] rounded-xl">
        <h1 className="text-3xl text-[#d8dee9] m-auto mt-5">
          AzikGeneratorWeb
        </h1>
        <Form
          method="POST"
          className="flex flex-col items center justify-center rounded-2xl"
        >
          <div className="flex flex-col items-center justify-center bg-[#2e3440] rounded-2xl m-5">
            <input
              className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
              type="text"
              name="token"
              placeholder="割り当て先"
            />
            <input
              className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
              type="text"
              name="sequence"
              placeholder="シーケンス"
            />
            <input
              className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
              type="text"
              name="sokuon"
              placeholder='"っ"の割り当て先'
            />
            <input
              className="bg-[#4c566a] my-2 mb-4 py-0.5 w-3xs rounded-md"
              type="text"
              name="hatsuon"
              placeholder='"ん"の割り当て先'
            />
          </div>
          <div className="flex flwex-col items-center justify-center">
            <button
              className="bg-[#444444] mb-2 py-1.5 px-2 w-auto rounded-xl"
              type="submit"
            >
              send
            </button>
            {actionData
              ? (
                <p>
                  <div className="flex items-center justify-center">
                    <a
                      className="bg-[#444444] mb-2 p-1.5 mx-2 w-auto rounded-xl text-center"
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
        </Form>
      </div>
    </div>
  );
}
