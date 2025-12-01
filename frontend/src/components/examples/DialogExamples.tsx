import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, UserPlus, Settings, Save, X } from 'lucide-react';
import { CodeExample } from '../CodeExample';

export default function DialogExamples() {
    const { t } = useTranslation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    
    // Form states
    const [profileData, setProfileData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação.'
    });
    
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleProfileSave = () => {
        console.log('Profile saved:', profileData);
        setIsProfileOpen(false);
    };

    const handleContactSubmit = () => {
        console.log('Contact form submitted:', contactData);
        setContactData({ name: '', email: '', message: '' });
        setIsContactOpen(false);
    };

    // Example codes for CodeExample components
    const basicDialogCode = {
        frontend: `import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function BasicDialogExample() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Simple Dialog</DialogTitle>
                    <DialogDescription>
                        This is a basic dialog example with a title and description.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p className="text-sm text-muted-foreground">
                        Dialog content goes here. You can add any components or content you need.
                    </p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}`
    };

    const profileDialogCode = {
        frontend: `import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserPlus } from 'lucide-react'

export function ProfileDialogExample() {
    const [isOpen, setIsOpen] = useState(false)
    const [profile, setProfile] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        bio: 'Desenvolvedor Full Stack'
    })

    const handleSave = () => {
        console.log('Profile saved:', profile)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">Bio</Label>
                        <Textarea
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}`,
        backend: `// ProfileController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpPut("{userId}")]
    public async Task<IActionResult> UpdateProfile(string userId, [FromBody] UpdateProfileRequest request)
    {
        var profile = await _profileService.GetByUserIdAsync(userId);
        if (profile == null)
        {
            return NotFound("Profile not found");
        }

        profile.Name = request.Name;
        profile.Email = request.Email;
        profile.Bio = request.Bio;
        profile.UpdatedAt = DateTime.UtcNow;

        await _profileService.UpdateAsync(profile);

        return Ok(new { 
            Message = "Profile updated successfully",
            Profile = profile 
        });
    }
}

public class UpdateProfileRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Bio { get; set; }
}`
    };

    const contactDialogCode = {
        frontend: `import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare } from 'lucide-react'

export function ContactDialogExample() {
    const [isOpen, setIsOpen] = useState(false)
    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = () => {
        console.log('Contact form submitted:', contact)
        setContact({ name: '', email: '', message: '' })
        setIsOpen(false)
    }

    const isValid = contact.name && contact.email && contact.message

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Us
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                        Send us a message and we'll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="contact-name">Name *</Label>
                        <Input
                            id="contact-name"
                            placeholder="Your full name"
                            value={contact.name}
                            onChange={(e) => setContact({...contact, name: e.target.value})}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-email">Email *</Label>
                        <Input
                            id="contact-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={contact.email}
                            onChange={(e) => setContact({...contact, email: e.target.value})}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-message">Message *</Label>
                        <Textarea
                            id="contact-message"
                            placeholder="Write your message here..."
                            rows={4}
                            value={contact.message}
                            onChange={(e) => setContact({...contact, message: e.target.value})}
                        />
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit} disabled={!isValid}>
                        Send Message
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}`,
        backend: `// ContactController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly IContactService _contactService;

    public ContactController(IEmailService emailService, IContactService contactService)
    {
        _emailService = emailService;
        _contactService = contactService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendContact([FromBody] ContactRequest request)
    {
        // Validate request
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Save contact to database
        var contact = new Contact
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Message = request.Message,
            CreatedAt = DateTime.UtcNow,
            Status = ContactStatus.New
        };

        await _contactService.CreateAsync(contact);

        // Send email notification
        await _emailService.SendContactNotificationAsync(contact);

        return Ok(new { 
            Message = "Your message has been sent successfully!",
            ContactId = contact.Id 
        });
    }
}

public class ContactRequest
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    public string Message { get; set; }
}`
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">{t('components.dialog.title')}</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                    {t('components.dialog.description')}
                </p>
            </div>

            {/* Basic Dialog */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>{t('components.dialog.basic.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.dialog.basic.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    {t('components.dialog.basic.openDialog')}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>{t('components.dialog.basic.dialogTitle')}</DialogTitle>
                                    <DialogDescription>
                                        {t('components.dialog.basic.dialogDescription')}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <p className="text-sm text-muted-foreground">
                                        {t('components.dialog.basic.content')}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="secondary">Simple</Badge>
                                        <Badge variant="outline">Elegant</Badge>
                                        <Badge>Responsive</Badge>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="secondary">
                                            {t('components.dialog.basic.close')}
                                        </Button>
                                    </DialogTrigger>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
                <CodeExample code={basicDialogCode} />
            </Card>

            {/* Profile Edit Dialog */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <UserPlus className="h-5 w-5" />
                        <span>{t('components.dialog.profile.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.dialog.profile.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    {t('components.dialog.profile.editProfile')}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>{t('components.dialog.profile.dialogTitle')}</DialogTitle>
                                    <DialogDescription>
                                        {t('components.dialog.profile.dialogDescription')}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            {t('components.dialog.profile.name')}
                                        </Label>
                                        <Input
                                            id="name"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            {t('components.dialog.profile.email')}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="bio" className="text-right">
                                            {t('components.dialog.profile.bio')}
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                            className="col-span-3"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => setIsProfileOpen(false)}>
                                        <X className="mr-2 h-4 w-4" />
                                        {t('components.dialog.profile.cancel')}
                                    </Button>
                                    <Button type="button" onClick={handleProfileSave}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {t('components.dialog.profile.save')}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {/* Current Profile Preview */}
                    <div className="p-4 bg-muted/50 rounded-lg border">
                        <h4 className="font-medium mb-2">{t('components.dialog.profile.currentProfile')}</h4>
                        <div className="space-y-1 text-sm">
                            <p><span className="font-medium">{t('components.dialog.profile.name')}:</span> {profileData.name}</p>
                            <p><span className="font-medium">{t('components.dialog.profile.email')}:</span> {profileData.email}</p>
                            <p><span className="font-medium">{t('components.dialog.profile.bio')}:</span> {profileData.bio}</p>
                        </div>
                    </div>
                </CardContent>
                <CodeExample code={profileDialogCode} />
            </Card>

            {/* Contact Dialog */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>{t('components.dialog.contact.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.dialog.contact.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    {t('components.dialog.contact.contactUs')}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>{t('components.dialog.contact.dialogTitle')}</DialogTitle>
                                    <DialogDescription>
                                        {t('components.dialog.contact.dialogDescription')}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-name">
                                            {t('components.dialog.contact.name')} *
                                        </Label>
                                        <Input
                                            id="contact-name"
                                            placeholder={t('components.dialog.contact.namePlaceholder')}
                                            value={contactData.name}
                                            onChange={(e) => setContactData({...contactData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-email">
                                            {t('components.dialog.contact.email')} *
                                        </Label>
                                        <Input
                                            id="contact-email"
                                            type="email"
                                            placeholder={t('components.dialog.contact.emailPlaceholder')}
                                            value={contactData.email}
                                            onChange={(e) => setContactData({...contactData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact-message">
                                            {t('components.dialog.contact.message')} *
                                        </Label>
                                        <Textarea
                                            id="contact-message"
                                            placeholder={t('components.dialog.contact.messagePlaceholder')}
                                            rows={4}
                                            value={contactData.message}
                                            onChange={(e) => setContactData({...contactData, message: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <DialogFooter className="gap-2">
                                    <Button type="button" variant="secondary" onClick={() => setIsContactOpen(false)}>
                                        <X className="mr-2 h-4 w-4" />
                                        {t('components.dialog.contact.cancel')}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        onClick={handleContactSubmit}
                                        disabled={!contactData.name || !contactData.email || !contactData.message}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        {t('components.dialog.contact.send')}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
                <CodeExample code={contactDialogCode} />
            </Card>
        </div>
    );
}