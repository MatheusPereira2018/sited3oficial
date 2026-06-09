
-- has_role: revogar execução pública, manter só authenticated (necessário p/ RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;

-- handle_new_user_admin: trigger; não deve ser executável diretamente
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;
