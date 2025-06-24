// src/components/MessageItem.jsx
import pb from '../pb';

export default function MessageItem({ msg, self }) {
  const files = Array.isArray(msg.file)
    ? msg.file.map(name => pb.files.getUrl(msg, name))
    : [];
    const createdTime = new Date(msg.created).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    
  return (
    <div className={` mb-2 ${self ? 'ml-auto text-right' : 'text-left'}`}>
    <div className={`inline-block max-w-sm p-3 py-0.5 min-w-10 rounded-3xl shadow ${self ? 'bg-[#766AC8] text-white' : 'bg-[#202c33] text-white'}`}>
    <div className='flex items-end justify-between gap-3'>{msg.text && (
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
         <h1 className={`text-xs  ${self ? 'text-gray-200' : 'text-gray-400'}`}>{createdTime}</h1></div>
      </div>
    </div>
  );
}