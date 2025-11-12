import { Theme } from '../App';

export const getThemeClasses = (theme: Theme) => ({
  bg: theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50',
  card: theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-gray-200',
  cardHover: theme === 'dark' ? 'hover:border-zinc-700' : 'hover:border-gray-300',
  text: theme === 'dark' ? 'text-white' : 'text-gray-900',
  textMuted: theme === 'dark' ? 'text-zinc-400' : 'text-gray-600',
  textSubtle: theme === 'dark' ? 'text-zinc-500' : 'text-gray-500',
  input: theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500' : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400',
  button: theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  buttonOutline: theme === 'dark' ? 'bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white' : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  border: theme === 'dark' ? 'border-zinc-800' : 'border-gray-200',
  bgSubtle: theme === 'dark' ? 'bg-zinc-800/30' : 'bg-gray-50',
  iconColor: theme === 'dark' ? 'text-zinc-500' : 'text-gray-400',
});
