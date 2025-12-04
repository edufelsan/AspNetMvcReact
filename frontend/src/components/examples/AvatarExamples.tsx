import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeExample } from '../CodeExample';

const AvatarExamples: React.FC = () => {
    const { t } = useTranslation();

    const frontendCode1 = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BasicAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`;

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

public class UserController : Controller
{
    public IActionResult Profile(string username)
    {
        var user = new
        {
            Username = username,
            Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={username}",
            Fallback = username.Substring(0, 2).ToUpper(),
            FullName = "User Name"
        };
        
        return Json(user);
    }
}`;

    const frontendCode2 = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sizes = [
  { size: "h-8 w-8", label: "Small" },
  { size: "h-12 w-12", label: "Medium" },
  { size: "h-16 w-16", label: "Large" },
  { size: "h-24 w-24", label: "Extra Large" }
]

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          <Avatar className={item.size}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}`;

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

public class UserController : Controller
{
    public class AvatarSize
    {
        public string Name { get; set; } = "";
        public int Width { get; set; }
        public int Height { get; set; }
        public string CssClass { get; set; } = "";
    }

    public IActionResult AvatarSizes()
    {
        var sizes = new[]
        {
            new AvatarSize { Name = "Small", Width = 32, Height = 32, CssClass = "h-8 w-8" },
            new AvatarSize { Name = "Medium", Width = 48, Height = 48, CssClass = "h-12 w-12" },
            new AvatarSize { Name = "Large", Width = 64, Height = 64, CssClass = "h-16 w-16" },
            new AvatarSize { Name = "Extra Large", Width = 96, Height = 96, CssClass = "h-24 w-24" }
        };
        
        return Json(sizes);
    }
}`;

    const frontendCode3 = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export function AvatarGroup({ users }: { users: User[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  }

  return (
    <div className="flex -space-x-4">
      {users.slice(0, 3).map((user) => (
        <div key={user.id} className="relative">
          <Avatar className="border-2 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className={\`absolute bottom-0 right-0 block h-3 w-3 rounded-full \${getStatusColor(user.status)} ring-2 ring-background\`} />
        </div>
      ))}
      {users.length > 3 && (
        <Avatar className="border-2 border-background">
          <AvatarFallback>+{users.length - 3}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}`;

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

public class TeamController : Controller
{
    public class TeamMember
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Avatar { get; set; } = "";
        public string Status { get; set; } = "offline";
        public string Role { get; set; } = "";
    }

    [HttpGet("/api/team/members")]
    public IActionResult GetTeamMembers()
    {
        var members = new[]
        {
            new TeamMember 
            { 
                Id = 1, 
                Name = "Sarah Johnson", 
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                Status = "online",
                Role = "Developer"
            },
            new TeamMember 
            { 
                Id = 2, 
                Name = "Mike Chen", 
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
                Status = "away",
                Role = "Designer"
            },
            new TeamMember 
            { 
                Id = 3, 
                Name = "Emily Davis", 
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
                Status = "online",
                Role = "Manager"
            },
            new TeamMember 
            { 
                Id = 4, 
                Name = "John Smith", 
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                Status = "offline",
                Role = "Developer"
            }
        };
        
        return Json(members);
    }
}`;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.avatar.title')}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.avatar.description')}
                </p>
            </div>

            {/* Example 1: Basic Avatar */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.avatar.basic.title')}</h3>
                <p className="text-muted-foreground">{t('components.avatar.basic.description')}</p>
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
                        <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode1, backend: backendCode1 }}
                />
            </div>

            {/* Example 2: Avatar Sizes */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.avatar.sizes.title')}</h3>
                <p className="text-muted-foreground">{t('components.avatar.sizes.description')}</p>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="text-xs">SH</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{t('components.avatar.sizes.small')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>SH</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{t('components.avatar.sizes.medium')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="text-lg">SH</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{t('components.avatar.sizes.large')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="text-2xl">SH</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{t('components.avatar.sizes.extraLarge')}</span>
                    </div>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode2, backend: backendCode2 }}
                />
            </div>

            {/* Example 3: Avatar Group with Status */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.avatar.group.title')}</h3>
                <p className="text-muted-foreground">{t('components.avatar.group.description')}</p>
                <div className="flex -space-x-4">
                    <div className="relative">
                        <Avatar className="border-2 border-background">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                    </div>
                    <div className="relative">
                        <Avatar className="border-2 border-background">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="Mike" />
                            <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-background" />
                    </div>
                    <div className="relative">
                        <Avatar className="border-2 border-background">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" alt="Emily" />
                            <AvatarFallback>ED</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                    </div>
                    <Avatar className="border-2 border-background">
                        <AvatarFallback>+2</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="block h-2 w-2 rounded-full bg-green-500" />
                        {t('components.avatar.group.online')}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="block h-2 w-2 rounded-full bg-yellow-500" />
                        {t('components.avatar.group.away')}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="block h-2 w-2 rounded-full bg-gray-400" />
                        {t('components.avatar.group.offline')}
                    </div>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode3, backend: backendCode3 }}
                />
            </div>
        </div>
    );
};

export default AvatarExamples;
