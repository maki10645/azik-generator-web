import axios from "axios";
import { useState } from "react";
import { Form } from "react-router";
import type { Route } from "./+types/home";

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const sokuon = form.get("sokuon");
	const hatsuon = form.get("hatsuon");
	const seqCount = Number(form.get("seqcount")?.toString());

	const tokens = [];
	const sequences = [];
	for (let i = 0; i < seqCount; i++) {
		tokens.push(form.get(`token${i}`));
		sequences.push(form.get(`sequence${i}`));
	}

	const sequenceArray = [];
	for (const i in tokens) {
		sequenceArray.push({ Token: tokens[i], Sequence: sequences[i] });
	}

	console.log(sequenceArray);

	const res = await axios.post("https://azik-generator-web-i0sb.shuttle.app", {
		Sequence: sequenceArray,
		Sokuon: sokuon,
		Hatsuon: hatsuon,
	});
	return res;
}

export default function Home({ actionData }: Route.ComponentProps) {
	const AzikFile = String(actionData?.data);
	const DownloadButton = `data:text/plain;charset=utf-8,${encodeURIComponent(
		AzikFile,
	)}`;
	const [seqCount, setSeqCount] = useState(1);
	const incrementSeqCount = () => {
		setSeqCount((prev) => prev + 1);
	};
	const decrementSeqCount = () => {
		if (seqCount > 1) {
			setSeqCount((prev) => prev - 1);
		} else {
			setSeqCount((prev) => prev);
		}
	};
	const tokens = [];
	const sequences = [];
	for (let i = 0; i < seqCount; i++) {
		tokens.push(`token${i}`);
		sequences.push(`sequence${i}`);
	}

	return (
		<div className="min-h-svh flex flex-col items-center justify-center bg-[#2e3440] overflow-hidden">
			<div className="flex flex-col items-center justify-center border-2 border-[#d8dee9] rounded-xl">
				<h1 className="text-3xl text-[#d8dee9] m-auto mt-5">
					AzikGeneratorWeb
				</h1>
				<Form
					method="POST"
					className="flex flex-row items center justify-center rounded-2xl"
				>
					<div className="flex flex-col items-center justify-center bg-[#2e3440] rounded-2xl">
						<div className="flex flex-row items-center justify-center bg-[#2e3440] rounded-2xl m-5">
							<div className="flex flex-col items-center justify-center bg-[#2e3440] rounded-2xl m-5">
								{tokens.map((data) => (
									<input
										className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
										type="text"
										name={data}
										placeholder="割り当て先"
									/>
								))}
							</div>
							<div className="flex flex-col items-center justify-center bg-[#2e3440] rounded-2xl m-2.5">
								{sequences.map((data) => (
									<input
										className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
										type="text"
										name={data}
										placeholder="シーケンス"
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col items-center justify-center bg-[#2e3440] rounded-2xl m-2.5 mt-4.5">
							<input
								className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
								type="text"
								name="sokuon"
								placeholder='"っ"の割り当て先'
							/>
							<input
								className="bg-[#4c566a] my-2 py-0.5 w-3xs rounded-md"
								type="text"
								name="hatsuon"
								placeholder='"ん"の割り当て先'
							/>
							<div className="flex flex-row items-center justify-center">
								<button
									className="bg-[#81A1C4] mb-2 py-0.5 px-2.5 w-8 rounded-xl"
									onClick={incrementSeqCount}
									type="button"
								>
									+
								</button>
								<input
									className="text-center bg-[#4c566a] my-2 mb-4 py-0.5 w-[12.5rem] rounded-md"
									type="text"
									name="seqcount"
									defaultValue={seqCount}
								/>

								<button
									className="bg-[#81A1C4] mb-2 py-0.5 px-2.5 w-8 rounded-xl"
									onClick={decrementSeqCount}
									type="button"
								>
									-
								</button>
							</div>
						</div>
						<div className="flex flwex-col items-center justify-center">
							<button
								className="bg-[#81A1C4] mb-2 py-1.5 px-2 w-auto rounded-xl"
								type="submit"
							>
								send
							</button>
							{actionData ? (
								<p>
									<div className="flex items-center justify-center">
										<a
											className="bg-[#81A1C4] mb-2 p-1.5 mx-2 w-auto rounded-xl text-center"
											href={DownloadButton}
											download="GoogleIMEKanaTable.txt"
										>
											DownloadKanaTable
										</a>
									</div>
								</p>
							) : null}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
