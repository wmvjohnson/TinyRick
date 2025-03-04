"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import {
  VercelIcon,
  GithubIcon,
  LoadingCircle,
  SendIcon,
  UserIcon,
} from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "Hey, can you help me reschedule our coffee meeting? Something came up!",
  "Just checking in-any updates on the proposal?",
  "Thanks for your help with the project! Really appreciate it.",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40 bg-purple-500 font-[Times_New_Roman]">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  message.role === "assistant"
                    ? "bg-white"
                    : "bg-black p-1.5 text-white",
                )}
              >
                {message.role === "user" ? (
                  <UserIcon />
                ) : (
                  <Image
                    src="/sample-image.png"
                    alt="sample-image"
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <Image
              src="/sample-image.png"
              alt="sample-image"
              width={40}
              height={40}
              className="h-20 w-20"
            />
            <h1 className="text-lg font-semibold text-black">
              Hi, I'm Tiny Rick.
            </h1>
            <p className="text-gray-500">
              I'm part of a series of computational experiments taught by{" "}
              <a
                href="https://linkin.bio/yallahalim/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                Halim Madi
              </a>. I was built using{" "}
              <a
                href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                fine-tuned GPT4.
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
