import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2, LogOut } from 'lucide-react';
import { CodeExample } from '../CodeExample';

const AlertDialogExamples: React.FC = () => {
  const { t } = useTranslation();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setDeleteOpen(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setLogoutOpen(false);
  };

  const frontendCode1 = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function BasicAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

  const backendCode1 = `// Controllers/AccountController.cs
public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteAccount()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
        {
            await HttpContext.SignOutAsync();
            return Inertia.Render("Auth/AccountDeleted")
                         .With("success", "Your account has been deleted successfully.");
        }

        return Inertia.Back().With("error", "Failed to delete account.");
    }
}`;

  const frontendCode2 = `import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DeleteConfirmationDialog() {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      // Call API to delete item
      await fetch('/api/items/delete', { method: 'POST' });
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete item');
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        onClick={() => setOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Item
      </Button>
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}`;

  const backendCode2 = `// Controllers/ItemsController.cs
public class ItemsController : Controller
{
    private readonly IItemService _itemService;

    public ItemsController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpPost]
    public IActionResult Delete(int id)
    {
        try
        {
            var item = _itemService.GetById(id);
            if (item == null)
            {
                return NotFound();
            }

            // Check authorization
            if (item.UserId != User.Identity.Name)
            {
                return Forbid();
            }

            _itemService.Delete(id);
            return Inertia.Back().With("success", "Item deleted successfully!");
        }
        catch (Exception ex)
        {
            return Inertia.Back().With("error", "Failed to delete item.");
        }
    }
}`;

  const frontendCode3 = `import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { router } from '@inertiajs/react';

export function LogoutConfirmationDialog() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    router.post('/auth/logout', {}, {
      onSuccess: () => {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will need to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}`;

  const backendCode3 = `// Controllers/AuthController.cs
public class AuthController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
    }

    [HttpPost]
    [Route("auth/logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Inertia.Location("/");
    }

    [HttpGet]
    [Route("auth/login")]
    public IActionResult Login()
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return RedirectToAction("Index", "Dashboard");
        }
        
        return Inertia.Render("Auth/Login");
    }
}`;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{t('components.alertDialog.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('components.alertDialog.description')}
        </p>
      </div>

      {/* Basic Alert Dialog */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.alertDialog.basic.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{t('components.alertDialog.basic.trigger')}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('components.alertDialog.basic.dialogTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('components.alertDialog.basic.dialogDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('components.alertDialog.basic.cancel')}</AlertDialogCancel>
                <AlertDialogAction>{t('components.alertDialog.basic.continue')}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode1,
            backend: backendCode1
          }}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.alertDialog.delete.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="destructive" 
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t('components.alertDialog.delete.trigger')}
          </Button>
          
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('components.alertDialog.delete.dialogTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('components.alertDialog.delete.dialogDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('components.alertDialog.delete.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {t('components.alertDialog.delete.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode2,
            backend: backendCode2
          }}
        />
      </div>

      {/* Logout Confirmation Dialog */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.alertDialog.logout.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('components.alertDialog.logout.trigger')}
          </Button>
          
          <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('components.alertDialog.logout.dialogTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('components.alertDialog.logout.dialogDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('components.alertDialog.logout.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  {t('components.alertDialog.logout.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode3,
            backend: backendCode3
          }}
        />
      </div>
    </div>
  );
};

export default AlertDialogExamples;
