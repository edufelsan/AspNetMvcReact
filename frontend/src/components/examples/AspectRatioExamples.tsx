import React from 'react';
import { useTranslation } from 'react-i18next';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Video } from 'lucide-react';
import { CodeExample } from '../CodeExample';

const AspectRatioExamples: React.FC = () => {
    const { t } = useTranslation();

    const frontendCode1 = `import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function ImageExample() {
  return (
    <div className="w-full max-w-2xl">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="/your-image.jpg"
          alt="Photo"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}`;

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

public class MediaController : Controller
{
    [HttpGet("/media/image")]
    public IActionResult GetImage()
    {
        var imageData = new
        {
            Url = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
            Alt = "Photo by Javier Allegue Barros",
            Width = 800,
            Height = 450,
            AspectRatio = "16:9"
        };
        
        return Json(imageData);
    }
}`;

    const frontendCode2 = `import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function VideoExample() {
  return (
    <div className="w-full max-w-xl">
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <video
          src="/your-video.mp4"
          className="h-full w-full object-cover"
          controls
        />
      </AspectRatio>
    </div>
  )
}`;

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

public class MediaController : Controller
{
    [HttpGet("/media/video")]
    public IActionResult GetVideo()
    {
        var videoData = new
        {
            Url = "/videos/sample.mp4",
            Type = "video/mp4",
            AspectRatio = "4:3",
            Width = 640,
            Height = 480
        };
        
        return Json(videoData);
    }
}`;

    const frontendCode3 = `import { AspectRatio } from "@/components/ui/aspect-ratio"

const aspectRatios = [
  { ratio: 1 / 1, label: "1:1 Square" },
  { ratio: 16 / 9, label: "16:9 Widescreen" },
  { ratio: 21 / 9, label: "21:9 Ultrawide" }
]

export default function ComparisonExample() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {aspectRatios.map((item) => (
        <div key={item.label}>
          <p>{item.label}</p>
          <AspectRatio ratio={item.ratio}>
            <div className="flex h-full w-full items-center justify-center">
              {item.label}
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}`;

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

public class MediaController : Controller
{
    [HttpGet("/media/aspect-ratios")]
    public IActionResult GetAspectRatios()
    {
        var aspectRatios = new[]
        {
            new { Ratio = "1:1", Name = "Square", Width = 1, Height = 1 },
            new { Ratio = "16:9", Name = "Widescreen", Width = 16, Height = 9 },
            new { Ratio = "21:9", Name = "Ultrawide", Width = 21, Height = 9 },
            new { Ratio = "4:3", Name = "Standard", Width = 4, Height = 3 }
        };
        
        return Json(aspectRatios);
    }
}`;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.aspectRatio.title')}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.aspectRatio.description')}
                </p>
            </div>

            {/* Example 1: Image with 16/9 Aspect Ratio */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.aspectRatio.imageRatio.title')}</h3>
                <p className="text-muted-foreground">{t('components.aspectRatio.imageRatio.description')}</p>
                <div className="w-full max-w-2xl">
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                            alt={t('components.aspectRatio.imageRatio.alt')}
                            className="h-full w-full object-cover"
                        />
                    </AspectRatio>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode1, backend: backendCode1 }}
                />
            </div>

            {/* Example 2: Video with 4/3 Aspect Ratio */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.aspectRatio.videoRatio.title')}</h3>
                <p className="text-muted-foreground">{t('components.aspectRatio.videoRatio.description')}</p>
                <div className="w-full max-w-xl">
                    <AspectRatio ratio={4 / 3} className="bg-muted rounded-md overflow-hidden">
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                            <Video className="h-16 w-16 text-white" />
                        </div>
                    </AspectRatio>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode2, backend: backendCode2 }}
                />
            </div>

            {/* Example 3: Multiple Aspect Ratios Comparison */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.aspectRatio.comparison.title')}</h3>
                <p className="text-muted-foreground">{t('components.aspectRatio.comparison.description')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1:1 Square */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">{t('components.aspectRatio.comparison.square')}</p>
                        <AspectRatio ratio={1 / 1} className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md">
                            <div className="flex h-full w-full items-center justify-center text-white font-bold text-2xl">
                                1:1
                            </div>
                        </AspectRatio>
                    </div>

                    {/* 16:9 Widescreen */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">{t('components.aspectRatio.comparison.widescreen')}</p>
                        <AspectRatio ratio={16 / 9} className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-md">
                            <div className="flex h-full w-full items-center justify-center text-white font-bold text-2xl">
                                16:9
                            </div>
                        </AspectRatio>
                    </div>

                    {/* 21:9 Ultrawide */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">{t('components.aspectRatio.comparison.ultrawide')}</p>
                        <AspectRatio ratio={21 / 9} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-md">
                            <div className="flex h-full w-full items-center justify-center text-white font-bold text-2xl">
                                21:9
                            </div>
                        </AspectRatio>
                    </div>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode3, backend: backendCode3 }}
                />
            </div>
        </div>
    );
};

export default AspectRatioExamples;
