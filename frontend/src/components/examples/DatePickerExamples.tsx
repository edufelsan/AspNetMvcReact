import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@/components/ui/date-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Briefcase } from 'lucide-react';
import { CodeExample } from '../CodeExample';

export default function DatePickerExamples() {
    const { t } = useTranslation();
    const [basicDate, setBasicDate] = useState<Date>();
    const [birthdayDate, setBirthdayDate] = useState<Date>();
    const [appointmentDate, setAppointmentDate] = useState<Date>();

    const handleClearDates = () => {
        setBasicDate(undefined);
        setBirthdayDate(undefined);
        setAppointmentDate(undefined);
    };

    const formatDateForDisplay = (date: Date | undefined) => {
        if (!date) return t('components.datePicker.noDateSelected');
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Example codes for CodeExample components
    const basicDatePickerCode = {
        frontend: `import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'

export function BasicDatePickerExample() {
    const [date, setDate] = useState<Date>()

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                    placeholder="Choose a date"
                />
            </div>
            {date && (
                <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Selected date:</p>
                    <p className="font-medium">
                        {date.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            )}
        </div>
    )
}`,
        backend: `// Controllers/DatePickerController.cs
public class DatePickerController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IDateService _dateService;

    public DatePickerController(UserManager<ApplicationUser> userManager, IDateService dateService)
    {
        _userManager = userManager;
        _dateService = dateService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var savedDates = await _dateService.GetUserSavedDatesAsync(user.Id);

        return Inertia.Render("DatePicker/Index", new { savedDates });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SaveDate([FromForm] SaveDateRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _dateService.SaveDateAsync(user.Id, request.SelectedDate, request.Label);
        
        return Inertia.Back().With("success", "Data salva com sucesso!");
    }
}

// Models/SaveDateRequest.cs
public class SaveDateRequest
{
    public DateTime SelectedDate { get; set; }
    public string Label { get; set; } = "";
    public string Description { get; set; } = "";
}`
    };

    const birthdayDatePickerCode = {
        frontend: `import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'
import { Badge } from '@/components/ui/badge'

export function BirthdayDatePickerExample() {
    const [birthdate, setBirthdate] = useState<Date>()

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <DatePicker
                    date={birthdate}
                    onDateChange={setBirthdate}
                    placeholder="Select your birth date"
                    className="w-full"
                />
            </div>
            
            {birthdate && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">🎂</span>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                            Your Birthday
                        </p>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200">
                        {birthdate.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                        Age: {new Date().getFullYear() - birthdate.getFullYear()} years
                    </p>
                </div>
            )}
        </div>
    )
}`,
        backend: `// Controllers/ProfileController.cs
public class ProfileController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IProfileService _profileService;

    public ProfileController(UserManager<ApplicationUser> userManager, IProfileService profileService)
    {
        _userManager = userManager;
        _profileService = profileService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Birthday()
    {
        var user = await _userManager.GetUserAsync(User);
        var profile = await _profileService.GetUserProfileAsync(user.Id);

        return Inertia.Render("Profile/Birthday", new { profile });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdateBirthday([FromForm] BirthdayUpdateRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        if (request.BirthDate > DateTime.Now.Date)
        {
            return Inertia.Back().With("error", "Data de nascimento não pode ser no futuro");
        }

        var user = await _userManager.GetUserAsync(User);
        await _profileService.UpdateBirthdayAsync(user.Id, request.BirthDate);
        
        return Inertia.Back().With("success", "Data de nascimento atualizada com sucesso!");
    }
}

// Models/BirthdayUpdateRequest.cs
public class BirthdayUpdateRequest
{
    [Required]
    public DateTime BirthDate { get; set; }
}

// Models/UserProfile.cs
public class UserProfile
{
    public string Id { get; set; } = "";
    public string UserId { get; set; } = "";
    public DateTime? BirthDate { get; set; }
    public int Age => BirthDate.HasValue ? DateTime.Now.Year - BirthDate.Value.Year : 0;
    public string ZodiacSign { get; set; } = "";
}`
    };

    const appointmentDatePickerCode = {
        frontend: `import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Briefcase } from 'lucide-react'

export function AppointmentDatePickerExample() {
    const [appointmentDate, setAppointmentDate] = useState<Date>()

    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Appointment Date</span>
                    </label>
                    <DatePicker
                        date={appointmentDate}
                        onDateChange={setAppointmentDate}
                        placeholder="Schedule for when?"
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Quick Actions</label>
                    <div className="flex space-x-2">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setAppointmentDate(new Date())}
                        >
                            Today
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                setAppointmentDate(tomorrow);
                            }}
                        >
                            Tomorrow
                        </Button>
                    </div>
                </div>
            </div>

            {appointmentDate && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-green-900 dark:text-green-100 flex items-center space-x-2">
                                <Briefcase className="h-4 w-4" />
                                <span>Appointment scheduled</span>
                            </p>
                            <p className="text-green-800 dark:text-green-200">
                                {appointmentDate.toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <Badge variant={appointmentDate.getTime() > new Date().getTime() ? "default" : "secondary"}>
                            {appointmentDate.getTime() > new Date().getTime() ? "Upcoming" : "Completed"}
                        </Badge>
                    </div>
                </div>
            )}
        </div>
    )
}`,
        backend: `// Controllers/AppointmentController.cs
public class AppointmentController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IAppointmentService _appointmentService;

    public AppointmentController(
        UserManager<ApplicationUser> userManager,
        IAppointmentService appointmentService)
    {
        _userManager = userManager;
        _appointmentService = appointmentService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var appointments = await _appointmentService.GetUserAppointmentsAsync(user.Id);

        return Inertia.Render("Appointments/Index", new { appointments });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Schedule([FromForm] AppointmentRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        if (request.Date < DateTime.Now.Date)
        {
            return Inertia.Back().With("error", "Não é possível agendar compromissos no passado");
        }

        var user = await _userManager.GetUserAsync(User);
        await _appointmentService.ScheduleAppointmentAsync(user.Id, request);

        return Inertia.Back().With("success", "Compromisso agendado com sucesso!");
    }
}

// Models/AppointmentRequest.cs
public class AppointmentRequest
{
    [Required]
    public DateTime Date { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = "";
    
    [StringLength(500)]
    public string Description { get; set; } = "";
}

// Models/Appointment.cs
public class Appointment
{
    public int Id { get; set; }
    public string UserId { get; set; } = "";
    public DateTime Date { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "Scheduled";
    public DateTime CreatedAt { get; set; }
}`
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <CalendarDays className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">{t('components.datePicker.title')}</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                    {t('components.datePicker.description')}
                </p>
            </div>

            {/* Basic Date Picker */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <CalendarDays className="h-5 w-5" />
                        <span>{t('components.datePicker.basic.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.datePicker.basic.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{t('components.datePicker.basic.selectDate')}</label>
                        <DatePicker
                            date={basicDate}
                            onDateChange={setBasicDate}
                            placeholder={t('components.datePicker.basic.placeholder')}
                        />
                    </div>
                    {basicDate && (
                        <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">{t('components.datePicker.basic.selectedDate')}</p>
                            <p className="font-medium">{formatDateForDisplay(basicDate)}</p>
                        </div>
                    )}
                </CardContent>
                <CodeExample code={basicDatePickerCode} />
            </Card>

            {/* Birthday Date Picker */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Badge variant="secondary" className="mr-2">🎂</Badge>
                        <span>{t('components.datePicker.birthday.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.datePicker.birthday.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('components.datePicker.birthday.selectBirthday')}</label>
                            <DatePicker
                                date={birthdayDate}
                                onDateChange={setBirthdayDate}
                                placeholder={t('components.datePicker.birthday.placeholder')}
                                className="w-full"
                            />
                        </div>
                        
                        {birthdayDate && (
                            <div className="space-y-3">
                                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-lg">🎂</span>
                                        <p className="font-medium text-blue-900 dark:text-blue-100">
                                            {t('components.datePicker.birthday.birthdayInfo')}
                                        </p>
                                    </div>
                                    <p className="text-blue-800 dark:text-blue-200">
                                        {formatDateForDisplay(birthdayDate)}
                                    </p>
                                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                                        {t('components.datePicker.birthday.age')}: {new Date().getFullYear() - birthdayDate.getFullYear()} {t('components.datePicker.birthday.years')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CodeExample code={birthdayDatePickerCode} />
            </Card>

            {/* Appointment Date Picker */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>{t('components.datePicker.appointment.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.datePicker.appointment.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{t('components.datePicker.appointment.selectDate')}</span>
                            </label>
                            <DatePicker
                                date={appointmentDate}
                                onDateChange={setAppointmentDate}
                                placeholder={t('components.datePicker.appointment.placeholder')}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('components.datePicker.appointment.actions')}</label>
                            <div className="flex space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setAppointmentDate(new Date())}
                                >
                                    {t('components.datePicker.appointment.today')}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                        const tomorrow = new Date();
                                        tomorrow.setDate(tomorrow.getDate() + 1);
                                        setAppointmentDate(tomorrow);
                                    }}
                                >
                                    {t('components.datePicker.appointment.tomorrow')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {appointmentDate && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-green-900 dark:text-green-100 flex items-center space-x-2">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{t('components.datePicker.appointment.scheduled')}</span>
                                    </p>
                                    <p className="text-green-800 dark:text-green-200">
                                        {formatDateForDisplay(appointmentDate)}
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                                        {appointmentDate.getTime() > new Date().getTime() 
                                            ? t('components.datePicker.appointment.future')
                                            : t('components.datePicker.appointment.past')
                                        }
                                    </p>
                                </div>
                                <Badge variant={appointmentDate.getTime() > new Date().getTime() ? "default" : "secondary"}>
                                    {appointmentDate.getTime() > new Date().getTime() 
                                        ? t('components.datePicker.appointment.upcoming')
                                        : t('components.datePicker.appointment.completed')
                                    }
                                </Badge>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CodeExample code={appointmentDatePickerCode} />
            </Card>

            {/* Reset Button */}
            <div className="flex justify-center pt-6">
                <Button onClick={handleClearDates} variant="outline">
                    {t('components.datePicker.clearAll')}
                </Button>
            </div>
        </div>
    );
}