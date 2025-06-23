// src/components/MessageItem.jsx
import pb from '../pb';

export default function MessageItem({ msg, self }) {
  const files = Array.isArray(msg.file)
    ? msg.file.map(name => pb.files.getUrl(msg, name))
    : [];

  return (
    <div className={`max-w-xs mb-2 ${self ? 'ml-auto text-right' : 'text-left'}`}>
      <div className={`p-3 rounded-2xl shadow ${self ? 'bg-[#005c4b] text-white' : 'bg-[#202c33] text-white'}`}>
        {msg.text && (
          <div className="whitespace-pre-wrap break-words mb-2">
            {msg.text}
          </div>
        )}
        {files.map((url, index) => {
          if (msg.type === 'image') {
            return <img key={index} src={url} alt="rasm" className="w-60 rounded-xl mt-2" />;
          }
          if (msg.type === 'audio') {
            return <audio key={index} controls src={url} className="mt-2 w-full" />;
          }
          if (msg.type === 'sticker') {
            return <img key={index} src={url} alt="sticker" className="w-20 h-20 mt-2" />;
          }
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 underline text-blue-300"
            >
              Faylni ko‘rish
            </a>
          );
        })}
      </div>
    </div>
  );
}