import { DiscIcon as Discord, Heart, RefreshCw, Send, X } from 'lucide-react';
import Task, { TaskStatus } from './Task';

interface TasksProps {
  status: TaskStatus;
  updateTaskStatus: (action: keyof TaskStatus) => void;
  isLoading: Record<string, boolean>;
}

function Tasks({ updateTaskStatus, status, isLoading }: TasksProps) {
  const handleTwitterVerify = () => {
    window.open('https://x.com/Aiden_Labs');
    updateTaskStatus('followed');
  };

  const handleLike = () => {
    window.open('https://x.com/Aiden_Labs/status/1900909853608132722');
    updateTaskStatus('liked');
  };

  const handleRetweet = () => {
    window.open('https://x.com/Aiden_Labs/status/1900909853608132722');
    updateTaskStatus('retweeted');
  };

  const handleDiscordJoin = () => {
    window.open('https://discord.gg/your-invite');
    updateTaskStatus('discord');
  };

  const handleTelegramJoin = () => {
    window.open('https://t.me/aidenofficialgroup');
    updateTaskStatus('telegram');
  };

  return (
    <>
      <Task
        icon={<X className="w-6 h-6 text-blue-400" />}
        label="Follow @Aiden_Labs on X"
        statusKey="followed"
        onClick={handleTwitterVerify}
        status={status.followed}
        isLoading={!!isLoading['followed']}
      />
      <Task
        icon={<Heart className="w-6 h-6 text-pink-400" />}
        label="Like Post"
        statusKey="liked"
        onClick={handleLike}
        status={status.liked}
        isLoading={!!isLoading['liked']}
      />
      <Task
        icon={<RefreshCw className="w-6 h-6 text-blue-400" />}
        label="Retweet Post"
        statusKey="retweeted"
        onClick={handleRetweet}
        status={status.retweeted}
        isLoading={!!isLoading['retweeted']}
      />
      <Task
        icon={<Discord className="w-6 h-6 text-indigo-400" />}
        label="Join Discord @Aiden Labs"
        statusKey="discord"
        onClick={handleDiscordJoin}
        status={status.discord}
        isLoading={!!isLoading['discord']}
      />
      <Task
        icon={<Send className="w-6 h-6 text-blue-400" />}
        label="Join Telegram @Aiden Official | Community"
        statusKey="telegram"
        onClick={handleTelegramJoin}
        status={status.telegram}
        isLoading={!!isLoading['telegram']}
      />
    </>
  );
}

export default Tasks;
