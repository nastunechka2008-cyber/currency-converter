import { supabase } from "../lib/supabase";

export const getCacheRate =  async ( base: string, target: string) => {
    const { data, error} = await supabase
    .from('rates_cache')
    .select('*')
    .eq('base', base)
    .eq('target', target)
    .single();

    if (error) return null;
    return data;
};

export const saveCachedRate = async (base:string, target: string, rate: number) => {
    const { error }  = await supabase
    .from('rates_cache')
    .upsert(
        { base, target, rate, updated_at: new  Date().toISOString() },
        {onConflict: 'base,target'}
    );

    if (error) throw error;
}