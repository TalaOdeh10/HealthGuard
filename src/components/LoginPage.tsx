import React, { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const { login, register } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('patient');

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('patient');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword, loginRole);
      toast.success(t('common.success'));
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await register(registerEmail, registerPassword, registerFullName, registerRole);
      toast.success(t('common.success'));
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-blue-600 mb-2">{t('app.name')}</h1>
          <p className="text-muted-foreground">{t('app.tagline')}</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('common.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('common.register')}</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.loginTitle')}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Enter your credentials to access your account' 
                    : 'أدخل بيانات الاعتماد للوصول إلى حسابك'}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-role">{t('auth.role')}</Label>
                    <Select value={loginRole} onValueChange={(value) => setLoginRole(value as UserRole)}>
                      <SelectTrigger id="login-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">{t('auth.patient')}</SelectItem>
                        <SelectItem value="doctor">{t('auth.doctor')}</SelectItem>
                        <SelectItem value="caregiver">{t('auth.caregiver')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t('auth.email')}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={loginRole === 'patient' ? 'patient@healthguard.com' : loginRole === 'doctor' ? 'doctor@healthguard.com' : 'caregiver@healthguard.com'}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('auth.password')}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? t('common.loading') : t('common.login')}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>{t('auth.registerTitle')}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Create a new account to get started' 
                    : 'إنشاء حساب جديد للبدء'}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-role">{t('auth.role')}</Label>
                    <Select value={registerRole} onValueChange={(value) => setRegisterRole(value as UserRole)}>
                      <SelectTrigger id="register-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">{t('auth.patient')}</SelectItem>
                        <SelectItem value="doctor">{t('auth.doctor')}</SelectItem>
                        <SelectItem value="caregiver">{t('auth.caregiver')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t('auth.fullName')}</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder={language === 'en' ? 'John Doe' : 'أحمد محمد'}
                      value={registerFullName}
                      onChange={(e) => setRegisterFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t('auth.email')}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="email@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t('auth.password')}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">{t('auth.confirmPassword')}</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? t('common.loading') : t('common.register')}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Demo Instructions */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              {language === 'en' 
                ? '📝 Demo Accounts: Use patient@healthguard.com, doctor@healthguard.com, or caregiver@healthguard.com with any password' 
                : '📝 حسابات تجريبية: استخدم patient@healthguard.com أو doctor@healthguard.com أو caregiver@healthguard.com مع أي كلمة مرور'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}