import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/ui/calendar';
import { CodeExample } from '@/components/CodeExample';
import type { DateRange } from 'react-day-picker';

const CalendarExamples: React.FC = () => {
    const { t } = useTranslation();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    // Exemplo 1: Calendar Básico
    const frontendCode1 = `import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export function BasicCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex flex-col items-center space-y-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            {date && (
                <p className="text-sm text-muted-foreground">
                    ${t('components.calendar.basic.selectedDate')}: {date.toLocaleDateString()}
                </p>
            )}
        </div>
    );
}`;

    const backendCode1 = `// Controllers/CalendarController.cs
public class CalendarController : Controller
{
    private readonly ICalendarService _calendarService;
    private readonly UserManager<ApplicationUser> _userManager;

    public CalendarController(ICalendarService calendarService, UserManager<ApplicationUser> userManager)
    {
        _calendarService = calendarService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index(DateTime? startDate = null, DateTime? endDate = null)
    {
        var user = await _userManager.GetUserAsync(User);
        var events = await _calendarService.GetEventsAsync(user.Id, startDate, endDate);
        
        return Inertia.Render("Calendar/Index", new { 
            events,
            startDate = startDate?.ToString("yyyy-MM-dd"),
            endDate = endDate?.ToString("yyyy-MM-dd")
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateEvent([FromForm] CalendarEventRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Render("Calendar/Create", new { 
                errors = ModelState,
                request
            });
        }

        var user = await _userManager.GetUserAsync(User);
        await _calendarService.CreateEventAsync(request, user.Id);
        
        return Redirect("/Calendar").With("success", "Event created successfully!");
    }

    [HttpGet]
    [Authorize]
    public IActionResult Create()
    {
        return Inertia.Render("Calendar/Create");
    }
}

// Models/CalendarEvent.cs
public class CalendarEvent
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string UserId { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

// Models/CalendarEventRequest.cs
public class CalendarEventRequest
{
    public DateTime Date { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
}`;

    // Exemplo 2: Calendar com Múltiplas Datas
    const frontendCode2 = `import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export function MultipleCalendar() {
    const [dates, setDates] = useState<Date[] | undefined>([]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <Calendar
                mode="multiple"
                selected={dates}
                onSelect={setDates}
                className="rounded-md border"
            />
            {dates && dates.length > 0 && (
                <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">
                        ${t('components.calendar.multiple.selectedDates')} ({dates.length}):
                    </p>
                    <ul className="space-y-1">
                        {dates.map((date, index) => (
                            <li key={index}>• {date.toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}`;

    const backendCode2 = `// Controllers/BookingController.cs
public class BookingController : Controller
{
    private readonly IBookingService _bookingService;
    private readonly IAvailabilityService _availabilityService;
    private readonly UserManager<ApplicationUser> _userManager;

    public BookingController(
        IBookingService bookingService,
        IAvailabilityService availabilityService, 
        UserManager<ApplicationUser> userManager)
    {
        _bookingService = bookingService;
        _availabilityService = availabilityService;
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CheckAvailability([FromForm] DateAvailabilityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var availabilityResults = new List<object>();
        foreach (var date in request.Dates)
        {
            var isAvailable = await _availabilityService.IsDateAvailableAsync(date);
            var slotsRemaining = await _availabilityService.GetAvailableSlotsAsync(date);
            
            availabilityResults.Add(new
            {
                date = date.ToString("yyyy-MM-dd"),
                available = isAvailable,
                slotsRemaining
            });
        }
        
        return Inertia.Render("Booking/AvailabilityResults", new
        {
            totalDates = request.Dates.Count,
            availableDates = availabilityResults.Count(x => (bool)((dynamic)x).available),
            results = availabilityResults
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> BookMultipleDates([FromForm] MultiBookingRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var bookingResult = await _bookingService.CreateMultipleBookingsAsync(user.Id, request.Dates);
        
        if (bookingResult.Success)
        {
            return Redirect("/Booking").With("success", 
                $"Booking created successfully for {request.Dates.Count} dates");
        }
        
        return Inertia.Back().With("error", bookingResult.ErrorMessage);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> MultipleBooking()
    {
        var availableDates = await _availabilityService.GetAvailableDatesAsync(DateTime.Today, DateTime.Today.AddMonths(3));
        return Inertia.Render("Booking/MultipleBooking", new { availableDates });
    }
}

// Models/DateAvailabilityRequest.cs
public class DateAvailabilityRequest
{
    public List<DateTime> Dates { get; set; } = new();
}

// Models/MultiBookingRequest.cs
public class MultiBookingRequest
{
    public List<DateTime> Dates { get; set; } = new();
}`;

    // Exemplo 3: Calendar com Range de Datas
    const frontendCode3 = `import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

export function RangeCalendar() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined
    });

    const calculateDays = () => {
        if (dateRange?.from && dateRange?.to) {
            const diff = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
            return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
        }
        return 0;
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border"
                numberOfMonths={2}
            />
            {dateRange?.from && (
                <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                        ${t('components.calendar.range.from')}: {dateRange.from.toLocaleDateString()}
                    </p>
                    {dateRange.to && (
                        <>
                            <p>
                                ${t('components.calendar.range.to')}: {dateRange.to.toLocaleDateString()}
                            </p>
                            <p className="font-medium pt-2">
                                ${t('components.calendar.range.totalDays')}: {calculateDays()} ${t('components.calendar.range.days')}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}`;

    const backendCode3 = `// Controllers/ReservationController.cs
public class ReservationController : Controller
{
    private readonly IReservationService _reservationService;
    private readonly IPricingService _pricingService;
    private readonly IAvailabilityService _availabilityService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ReservationController(
        IReservationService reservationService,
        IPricingService pricingService,
        IAvailabilityService availabilityService,
        UserManager<ApplicationUser> userManager)
    {
        _reservationService = reservationService;
        _pricingService = pricingService;
        _availabilityService = availabilityService;
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CalculatePrice([FromForm] DateRangeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var priceCalculation = await _pricingService.CalculateRangePriceAsync(request.StartDate, request.EndDate);
        
        return Inertia.Render("Reservation/PriceCalculation", new
        {
            startDate = request.StartDate.ToString("yyyy-MM-dd"),
            endDate = request.EndDate.ToString("yyyy-MM-dd"),
            totalDays = priceCalculation.TotalDays,
            basePrice = priceCalculation.BasePrice,
            subtotal = priceCalculation.Subtotal,
            discount = priceCalculation.DiscountPercentage,
            totalPrice = priceCalculation.FinalPrice
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] ReservationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var reservation = await _reservationService.CreateReservationAsync(user.Id, request);
        
        return Redirect("/Reservation").With("success", "Reservation created successfully!");
    }

    [HttpGet]
    [Authorize] 
    public async Task<IActionResult> CheckAvailability(DateTime startDate, DateTime endDate)
    {
        var availabilityResult = await _availabilityService.CheckRangeAvailabilityAsync(startDate, endDate);
        
        return Inertia.Render("Reservation/AvailabilityCheck", new
        {
            startDate = startDate.ToString("yyyy-MM-dd"),
            endDate = endDate.ToString("yyyy-MM-dd"),
            totalDays = availabilityResult.TotalDays,
            available = availabilityResult.IsAvailable,
            unavailableDates = availabilityResult.UnavailableDates?.Select(d => d.ToString("yyyy-MM-dd"))
        });
    }

    [HttpGet]
    public IActionResult Create()
    {
        return Inertia.Render("Reservation/Create");
    }
}

// Models/DateRangeRequest.cs
public class DateRangeRequest
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

// Models/ReservationRequest.cs
public class ReservationRequest
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Notes { get; set; }
}`;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.calendar.title')}</h2>
                <p className="text-muted-foreground text-lg">
                    {t('components.calendar.description')}
                </p>
            </div>

            {/* Exemplo 1: Calendar Básico */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.calendar.basic.title')}</h3>
                    <p className="text-muted-foreground">{t('components.calendar.basic.description')}</p>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                    {date && (
                        <p className="text-sm text-muted-foreground">
                            {t('components.calendar.basic.selectedDate')}: {date.toLocaleDateString()}
                        </p>
                    )}
                </div>

                <CodeExample code={{ frontend: frontendCode1, backend: backendCode1 }} />
            </div>

            {/* Exemplo 2: Calendar com Múltiplas Datas */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.calendar.multiple.title')}</h3>
                    <p className="text-muted-foreground">{t('components.calendar.multiple.description')}</p>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
                    <Calendar
                        mode="multiple"
                        selected={multipleDates}
                        onSelect={setMultipleDates}
                        className="rounded-md border"
                    />
                    {multipleDates && multipleDates.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium mb-2">
                                {t('components.calendar.multiple.selectedDates')} ({multipleDates.length}):
                            </p>
                            <ul className="space-y-1">
                                {multipleDates.map((d, index) => (
                                    <li key={index}>• {d.toLocaleDateString()}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <CodeExample code={{ frontend: frontendCode2, backend: backendCode2 }} />
            </div>

            {/* Exemplo 3: Calendar com Range de Datas */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.calendar.range.title')}</h3>
                    <p className="text-muted-foreground">{t('components.calendar.range.description')}</p>
                </div>

                <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
                    <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        className="rounded-md border"
                        numberOfMonths={2}
                    />
                    {dateRange?.from && (
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                                {t('components.calendar.range.from')}: {dateRange.from.toLocaleDateString()}
                            </p>
                            {dateRange.to && (
                                <>
                                    <p>
                                        {t('components.calendar.range.to')}: {dateRange.to.toLocaleDateString()}
                                    </p>
                                    <p className="font-medium pt-2">
                                        {t('components.calendar.range.totalDays')}: {Math.ceil(Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} {t('components.calendar.range.days')}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <CodeExample code={{ frontend: frontendCode3, backend: backendCode3 }} />
            </div>
        </div>
    );
};

export default CalendarExamples;
