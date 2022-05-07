import { CloseButton } from "../CloseButton";

import bugImageURL from '../../assets/bug.svg';
import ideaImageURL from '../../assets/idea.svg';
import thoughtImageURL from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";


export const feedbackTypes ={
  BUG:{
    title: 'Problema',
    image:{
      source: bugImageURL,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA:{
    title: 'Ideia',
    image:{
      source: ideaImageURL,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER:{
    title: 'Outro',
    image:{
      source: thoughtImageURL,
      alt: 'Imagem uma nuvem de pensamento'
    }
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { feedbackSent ? (
        <FeedbackSucessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
          ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback} 
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )} 
      
      <footer className="text-xs text-neutral-400 italic">
        &copy; 2022 <a href="https://github.com/BrunoRafael-01" className="underline underline-offset-1 italic">DevBrunoRafael</a>
      </footer>

    </div>
  );
}