'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Mic } from 'lucide-react';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while searching.');
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      recognition.start();
    } else {
      alert('音声入力はこのブラウザでサポートされていません。');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索キーワードを入力"
          className="flex-grow"
        />
        <Button onClick={handleVoiceInput} variant="outline">
          <Mic className={isListening ? 'text-red-500' : ''} />
        </Button>
        <Button onClick={handleSearch}>検索</Button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">検索結果:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}