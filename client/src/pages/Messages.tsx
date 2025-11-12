import { useState } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import maleAvatar from '@assets/generated_images/Male_user_avatar_08fceb1b.png';
import femaleAvatar from '@assets/generated_images/Female_user_avatar_249300ec.png';

export default function Messages() {
  const [, params] = useRoute('/messages/:userId?');
  const [messageText, setMessageText] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(params?.userId || '1');

  // TODO: Replace with actual API call
  const conversations = [
    {
      id: '1',
      user: {
        name: 'Pierre Martin',
        avatar: maleAvatar,
      },
      lastMessage: 'D\'accord, à bientôt!',
      lastMessageTime: '10:30',
      unread: 2,
    },
    {
      id: '2',
      user: {
        name: 'Marie Dubois',
        avatar: femaleAvatar,
      },
      lastMessage: 'Merci pour votre message',
      lastMessageTime: 'Hier',
      unread: 0,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      text: 'Bonjour, je suis intéressé par votre trajet Paris-Lyon',
      time: '10:15',
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      text: 'Bonjour! Oui bien sûr, j\'ai encore de la place disponible.',
      time: '10:20',
      isMine: true,
    },
    {
      id: '3',
      senderId: '1',
      text: 'Parfait! Je dois envoyer un colis de 5kg. C\'est possible?',
      time: '10:25',
      isMine: false,
    },
    {
      id: '4',
      senderId: 'me',
      text: 'Oui, pas de problème. Vous pouvez réserver directement.',
      time: '10:28',
      isMine: true,
    },
    {
      id: '5',
      senderId: '1',
      text: 'D\'accord, à bientôt!',
      time: '10:30',
      isMine: false,
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      // TODO: Send message via API
      setMessageText('');
    }
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-messages-title">
        Messages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Conversations List */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-3 rounded-md text-left hover-elevate ${
                      selectedConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                    data-testid={`conversation-${conversation.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>{conversation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate">{conversation.user.name}</span>
                          <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="ml-auto">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-8">
          {currentConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={currentConversation.user.avatar} />
                      <AvatarFallback>{currentConversation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold" data-testid="text-chat-user-name">{currentConversation.user.name}</h3>
                      <p className="text-sm text-muted-foreground">En ligne</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[480px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                        data-testid={`message-${message.id}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.isMine
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Tapez votre message..."
                      data-testid="input-message"
                    />
                    <Button type="submit" size="icon" data-testid="button-send">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[600px]">
              <p className="text-muted-foreground">Sélectionnez une conversation pour commencer</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
