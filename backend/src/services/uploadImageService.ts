import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export default async function uploadImageService(file: any) {
  const date = new Date().toISOString().replace(/:/g, '-');
  const newImageName = 'images/' + date + file.name;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  const { data, error } = await supabase.storage.from('recetario').upload(newImageName, file.data, {
    contentType: file.mimetype,
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error

  const { data: publicUrl } = await supabase
    .storage
    .from('recetario')
    .getPublicUrl(newImageName)
  
  return publicUrl.publicUrl
}