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

    public CalendarController(ICalendarService calendarService)
    {
        _calendarService = calendarService;
    }

    [HttpGet]
    public IActionResult Index(DateTime? startDate = null, DateTime? endDate = null)
    {
        var events = _calendarService.GetEvents(startDate, endDate);
        return Inertia.Render("Calendar/Index", new { events });
    }

    [HttpPost]
    public IActionResult CreateEvent(CalendarEventRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Render("Calendar/Create", new { errors = ModelState });
        }

        _calendarService.CreateEvent(request);
        TempData["Success"] = "Evento criado com sucesso!";
        return RedirectToAction("Index");
    }

    [HttpGet]
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
}
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace AspNetMvcReact.Controllers
{
    public class BookingController : Controller
    {
        // Verificar disponibilidade de múltiplas datas
        [HttpPost]
        public IActionResult CheckAvailability(DateAvailabilityRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Inertia.Render("Booking/CheckAvailability", new { errors = ModelState });
            }

            var availabilityResults = request.Dates.Select(date => new
            {
                date = date,
                available = IsDateAvailable(date),
                slotsRemaining = GetAvailableSlots(date)
            }).ToList();
            
            return Inertia.Render("Booking/AvailabilityResults", new
            {
                totalDates = request.Dates.Count,
                availableDates = availabilityResults.Count(x => x.available),
                results = availabilityResults
            });
        }

        // Reservar múltiplas datas
        [HttpPost]
        public IActionResult BookMultipleDates(MultiBookingRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Inertia.Render("Booking/MultipleBooking", new { errors = ModelState });
            }

            // Processar reservas
            // ... salvar no banco de dados
            
            TempData["Success"] = $"Reserva criada com sucesso para {request.Dates.Count} datas";
            return RedirectToAction("Index");
        }

        private bool IsDateAvailable(DateTime date) => date > DateTime.Today;
        private int GetAvailableSlots(DateTime date) => new Random().Next(0, 10);
    }

    public class DateAvailabilityRequest
    {
        public List<DateTime> Dates { get; set; } = new();
    }

    public class MultiBookingRequest
    {
        public string UserId { get; set; } = string.Empty;
        public List<DateTime> Dates { get; set; } = new();
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace AspNetMvcReact.Controllers
{
    public class ReservationController : Controller
    {
        // Calcular preço para range de datas
        [HttpPost]
        public IActionResult CalculatePrice(DateRangeRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Inertia.Render("Reservation/CalculatePrice", new { errors = ModelState });
            }

            var days = (request.EndDate - request.StartDate).Days + 1;
            var basePrice = 100.00m;
            var totalPrice = days * basePrice;
            
            // Aplicar desconto para reservas longas
            var discount = days >= 7 ? 0.15m : days >= 3 ? 0.10m : 0m;
            var finalPrice = totalPrice * (1 - discount);
            
            return Inertia.Render("Reservation/PriceCalculation", new
            {
                startDate = request.StartDate,
                endDate = request.EndDate,
                totalDays = days,
                basePrice = basePrice,
                subtotal = totalPrice,
                discount = discount * 100,
                totalPrice = finalPrice
            });
        }

        // Criar reserva com range de datas
        [HttpPost]
        public IActionResult CreateReservation(ReservationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Inertia.Render("Reservation/Create", new { errors = ModelState });
            }

            // Processar reserva
            // ... salvar no banco de dados
            
            TempData["Success"] = "Reserva criada com sucesso!";
            return RedirectToAction("Index");
        }

        // Verificar disponibilidade em um range
        [HttpGet("availability")]
        public IActionResult CheckRangeAvailability(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var days = (endDate - startDate).Days + 1;
            var unavailableDates = new List<DateTime>(); // Simular datas indisponíveis
            
            return Ok(new
            {
                startDate = startDate,
                endDate = endDate,
                totalDays = days,
                available = unavailableDates.Count == 0,
                unavailableDates = unavailableDates
            });
        }
    }

    public class DateRangeRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class ReservationRequest
    {
        public string UserId { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
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
