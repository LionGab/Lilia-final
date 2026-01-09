import React, { useState } from 'react';
import { TUTORIALS, Tutorial } from '../constants/tutorials';

interface TutorialsPanelProps {
  onBack?: () => void;
}

const TutorialsPanel: React.FC<TutorialsPanelProps> = ({ onBack }) => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  if (selectedTutorial) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-black">
        <div className="flex-none border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => {
              if (selectedTutorial) {
                setSelectedTutorial(null);
              } else if (onBack) {
                onBack();
              }
            }}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {selectedTutorial.title}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedTutorial.content}
            </div>
            {selectedTutorial.steps && (
              <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resumo dos Passos:</h3>
                <ol className="space-y-2">
                  {selectedTutorial.steps.map((step, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300">
                      <strong>{index + 1}.</strong> {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-black">
      <div className="flex-none border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
        )}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Tutoriais</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Aprenda a usar todas as funcionalidades do Funil ERL
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {TUTORIALS.map((tutorial) => (
            <button
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{tutorial.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tutorial.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPanel;

